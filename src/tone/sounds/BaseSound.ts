import { Synth } from "tone";
import MyMixer from "../Mixer";
import Samples from "../Samples";
import { Time } from "tone/build/esm/core/type/Units";

abstract class BaseSound {
  protected mixer: MyMixer;
  protected samples?: Samples;
  protected synths: Synth[] = [];

  constructor(mixer: MyMixer, samples?: Samples) {
    this.mixer = mixer;
    if (samples) this.samples = samples;
  }

  abstract play(time: Time): void;

  abstract stop(): void;
}

export default BaseSound;
