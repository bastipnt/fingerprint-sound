import { Gain, Oscillator, Sequence, Tremolo } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { FPAttributes } from "../../fingerprint";
import { PlayState, SoundVariableKey, SoundVariableValue } from "../../providers/soundProvider";
import BaseSound from "./BaseSound";

class CanvasSound extends BaseSound {
  private gain = new Gain(0.3);

  private canvasArr?: Uint8Array;
  private count = 0;

  private osc1 = new Oscillator(440, "triangle16").start();
  private osc2 = new Oscillator(880, "triangle16").start();

  private tremolo = new Tremolo(9, 0.75).start();

  seq = new Sequence(
    (time, pattern: number) => {
      if (!this.canvasArr) return;
      if (this.count >= this.canvasArr.length) this.count = 0;
      if (Math.random() < 0.2) return;

      this.tremolo.frequency.rampTo(Math.pow(pattern, 2), "8n", time);
      const currNum = this.canvasArr[this.count];

      this.osc1.frequency.value = currNum * 2 + 100;
      this.osc2.frequency.value = currNum * 3 + 100;

      this.count++;
    },
    [1, 2, 3, 4, 5, 6, 7, 8],
    "4n",
  );

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.gain.chain(this.tremolo, this.envelope);
    this.osc1.connect(this.gain);
    this.osc2.connect(this.gain);
  }

  updateVariables(name: SoundVariableKey, value: SoundVariableValue): void {
    super.updateVariables(name, value);
    const canvasData = this.musicVariables.get(FPAttributes.canvas2D);
    if (!canvasData || typeof canvasData !== "string") return;

    const canvasBinaryStr = atob(canvasData.replace(/^data:image\/(png|jpg);base64,/, ""));
    this.canvasArr = new Uint8Array(canvasBinaryStr.length);
    for (let i = 0; i < canvasBinaryStr.length; i++) {
      this.canvasArr[i] = canvasBinaryStr.charCodeAt(i);
    }
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };
}

export default CanvasSound;
