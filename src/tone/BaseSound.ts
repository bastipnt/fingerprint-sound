import { Synth } from "tone";
import MyMixer from "./Mixer";

abstract class BaseSound {
  protected mixer: MyMixer;
  protected synths: Synth[] = [];

  constructor(mixer: MyMixer) {
    this.mixer = mixer;
  }

  abstract play(): void;

  abstract stop(): void;
}

export default BaseSound;
