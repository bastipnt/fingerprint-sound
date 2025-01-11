import { Gain } from "tone";
import AudioSound from "../sounds/AudioSound";
import CanvasSound from "../sounds/CanvasSound";
import FontsSound from "../sounds/FontsSound";
import LangaugesSound from "../sounds/LanguagesSound";
import OsCpuSound from "../sounds/OsCpuSound";
import TimezoneSound from "../sounds/TimezoneSound";
import BaseComposition from "./BaseComposition";

export default class Composition extends BaseComposition {
  scale = "C4 minor";

  constructor(mainGain: Gain) {
    super(mainGain);
    this.createSounds();
  }

  createSounds() {
    this.fpAttributeSounds.set("fonts", new FontsSound(this.envelope, this.scale));
    this.fpAttributeSounds.set("audio", new AudioSound(this.envelope, this.scale));
    this.fpAttributeSounds.set("canvas", new CanvasSound(this.envelope, this.scale));
    this.fpAttributeSounds.set("languages", new LangaugesSound(this.envelope, this.scale));
    this.fpAttributeSounds.set("osCpu", new OsCpuSound(this.envelope, this.scale));
    this.fpAttributeSounds.set("timezone", new TimezoneSound(this.envelope, this.scale));
  }
}
