import { FMSynth, Gain, now as toneNow } from "tone";
import BaseComposition from "./BaseComposition";

export default class Composition extends BaseComposition {
  scale = "C4 minor";

  constructor(mainGain: Gain) {
    super(mainGain);
  }
}
