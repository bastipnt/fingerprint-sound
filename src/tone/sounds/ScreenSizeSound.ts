import {
  AutoPanner,
  Chorus,
  Filter,
  Freeverb,
  FrequencyShifter,
  Gain,
  Noise,
  Player,
  Reverb,
  Sequence,
  Signal,
} from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import hihat from "../../assets/samples/metallic-hyperpop-hat_160bpm.wav";
import { FPAttributes } from "../../fingerprint";
import { PlayState, SoundVariableKey, SoundVariableValue } from "../../providers/soundProvider";
import { scale } from "../../util/number";
import BaseSound from "./BaseSound";

/**
 * Maybe size can influence the delay/reverb of this?
 * Make it sound like a bigger room?
 *
 * Sound: hihat (metallic-hyperpop-hat_160bpm)
 *
 * Inspiration: https://soundcloud.com/area3000/antidote-world-radio-invites-dj-wayang-girl-tool-7-november-2023 (1:57:00)
 *
 * Change reverb size depending on screen size
 *
 */
class ScreenSizeSound extends BaseSound {
  private _decay: number = 3;

  private player0 = new Player();
  private player1 = new Player();

  private reverb = new Reverb({ decay: this.decay, wet: 1 });
  private freqShift = new FrequencyShifter(50);
  private signal = new Signal(0, "number");
  private noise = new Noise("pink").start();
  private filter = new Filter(1500, "lowpass");
  private freeverb = new Freeverb(0.5);
  private chorus = new Chorus(2, 2.7, 0.7).start();
  private gain = new Gain(0.1);
  private autoPan = new AutoPanner("4m").start();

  private seq = new Sequence(
    (time, pattern: number) => {
      const ramp = scale(Math.random(), 0, 1, -500, 500);
      const rampFilter = scale(Math.random(), 0, 1, 800, 2000);

      if (pattern) this.signal.rampTo(ramp, "2m", time);
      this.filter.frequency.rampTo(rampFilter, "4n", "+4n");
    },
    [0, 1],
    "2m",
  );

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.autoPan.set({ wet: 0.7 });
    this.noise.chain(
      this.freqShift,
      this.filter,
      this.freeverb,
      this.chorus,
      this.gain,
      this.autoPan,
      this.envelope,
    );

    this.freeverb.dampening = 1200;

    this.signal.connect(this.freqShift.frequency);
  }

  async load() {
    await Promise.all([this.player0.load(hihat), this.player1.load(hihat), this.reverb.ready]);
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };

  updateVariables(name: SoundVariableKey, value: SoundVariableValue): void {
    super.updateVariables(name, value);

    const screenSize = this.musicVariables.get(FPAttributes.screenSize);
    console.log("update", screenSize);
    if (!screenSize || typeof screenSize !== "string") return;

    const width = Number(screenSize.split("x")[0]);
    this.decay = scale(width, 800, 6000, 0, 20);

    // const [mouseX, mouseY] = (this.musicVariables.get("mousePosition") as [number, number]) || [
    //   0, 0,
    // ];
    // const x = scale(mouseX, 0, window.innerWidth, 0, 1);
  }

  private get decay() {
    return this._decay;
  }

  private set decay(newDecay: number) {
    if (this._decay === newDecay) return;
    this._decay = newDecay;
    this.reverb.set({ decay: newDecay });
  }
}

export default ScreenSizeSound;
