import { AutoWah, Distortion, Filter, Gain, MembraneSynth, Reverb, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { FPAttributes } from "../../fingerprint";
import { FPAttributeName, FPAttributeValue, PlayState } from "../../providers/soundProvider";
import { scale } from "../../util/number";
import BaseSound from "./BaseSound";

class WebGLSound extends BaseSound {
  private webGlArr?: Uint8Array;
  private count = 0;

  private gain = new Gain(0.2);
  private synth0 = new MembraneSynth({ detune: 1 });
  private synth1 = new MembraneSynth({ detune: 0 });
  private synth2 = new MembraneSynth({ detune: 2 });
  private synth3 = new MembraneSynth({ detune: 5 });

  private wah = new AutoWah(50, 6, -30);
  private filter = new Filter(1000, "lowpass");
  private dist = new Distortion(0.8);
  private rev = new Reverb(100);

  private seq = new Sequence(
    (time, pattern: number) => {
      if (!this.webGlArr) return;
      if (this.count >= this.webGlArr.length) this.count = 0;
      const currNum = this.webGlArr[this.count];
      const baseFreq = scale(currNum, 0, 256, 100, 1000);
      const q = scale(pattern, 0, 3, 2, 8);

      if (pattern === 0) return;
      this.wah.Q.rampTo(q, "8n", time);

      this.synth0.triggerAttackRelease(baseFreq, "8n", time);

      if (pattern === 1) this.synth1.triggerAttackRelease(baseFreq * 1.3, "4n", time);
      if (pattern === 2) this.synth2.triggerAttackRelease(baseFreq * 1.1, "4n", time);
      if (pattern === 3) this.synth3.triggerAttackRelease(baseFreq * 1.2, "4n", time);

      this.count++;
    },
    [1, 0, 0, 3, 0, 2, 0, 0],
    "4n",
  );

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.rev.chain(this.dist, this.wah, this.filter, this.gain, this.envelope);
    this.wah.Q.value = 4;
    this.wah.set({ wet: 0.5 });

    this.synth0.connect(this.rev);
    this.synth1.connect(this.rev);
    this.synth2.connect(this.rev);
    this.synth3.connect(this.rev);
  }

  updateVariables(name: FPAttributeName, value: FPAttributeValue): void {
    super.updateVariables(name, value);
    const webGlData = this.musicVariables.get(FPAttributes.canvasWebGL);
    if (!webGlData || typeof webGlData !== "string") return;

    const canvasBinaryStr = atob(webGlData.replace(/^data:image\/(png|jpg);base64,/, ""));
    this.webGlArr = new Uint8Array(canvasBinaryStr.length);
    for (let i = 0; i < canvasBinaryStr.length; i++) {
      this.webGlArr[i] = canvasBinaryStr.charCodeAt(i);
    }
  }

  async load(): Promise<void> {
    await this.rev.ready;
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };
}

export default WebGLSound;
