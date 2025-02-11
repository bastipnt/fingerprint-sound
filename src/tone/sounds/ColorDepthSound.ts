import { AmplitudeEnvelope, Filter, Gain, GrainPlayer, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import kick from "../../assets/samples/kick-rumble.wav";
import { FPAttributes } from "../../fingerprint";
import { PlayState, SoundVariableKey, SoundVariableValue } from "../../providers/soundProvider";
import BaseSound from "./BaseSound";

class ColorDepthSound extends BaseSound {
  private player?: GrainPlayer;
  private gain = new Gain(1.5);
  private amEnv = new AmplitudeEnvelope(0.4, 0.1, 0.3, 0.2);
  private filter = new Filter(1000, "lowpass");
  private depth = -10;

  private seq = new Sequence(
    (time, pattern: 0 | 1) => {
      if (!pattern) return;
      const newPlaybackRate = 0.1 - this.depth * 0.001 + Math.random() * 0.01;
      if (this.player?.playbackRate !== newPlaybackRate)
        this.player?.set({ playbackRate: newPlaybackRate });

      this.amEnv.triggerAttackRelease("4n", time);
    },
    [1, 0, 0, 1, 1, 0, 1, 1],
    "2n",
  );

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.gain.chain(this.amEnv, this.filter, this.envelope);
  }

  updateVariables(name: SoundVariableKey, value: SoundVariableValue): void {
    super.updateVariables(name, value);
    const colorDepth = this.musicVariables.get(FPAttributes.COLOR_DEPTH);
    if (!colorDepth || typeof colorDepth !== "string") return;

    const colorDepthNum = Number(colorDepth);
    if (isNaN(colorDepthNum)) return;

    this.depth = colorDepthNum;

    // const [mouseX, mouseY] = (this.musicVariables.get("mousePosition") as [number, number]) || [
    //   0, 0,
    // ];
    // const x = scale(mouseX, 0, window.innerWidth, 0, 1);
  }

  async load() {
    await new Promise((resolve) => {
      this.player = new GrainPlayer(kick, () => resolve(null));
    });

    this.player?.set({
      grainSize: 0.005,
      loop: true,
      overlap: 0.05,
      loopStart: 0.1,
      loopEnd: 0.2,
      playbackRate: 0.1 - this.depth * 0.001,
      detune: 2,
    });
    this.player?.connect(this.gain);
    this.player?.start();
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };
}

export default ColorDepthSound;
