import { Gain } from "tone";
import { FPAttributes } from "../../fingerprint";
import AudioSound from "../sounds/AudioSound";
import CanvasSound from "../sounds/CanvasSound";
import ColorDepthSound from "../sounds/ColorDepthSound";
import ScreenSizeSound from "../sounds/ScreenSizeSound";
import TimezoneSound from "../sounds/TimezoneSound";
import WebGLSound from "../sounds/WebGLSound";
import BaseComposition from "./BaseComposition";

export default class Composition extends BaseComposition {
  scale = "C4 minor";

  constructor(mainGain: Gain) {
    super(mainGain);
    this.createSounds();
  }

  createSounds() {
    this.fpAttributeSounds.set(
      FPAttributes.screenSize,
      new ScreenSizeSound(this.envelope, this.scale),
    );
    this.fpAttributeSounds.set(
      FPAttributes.audioContext,
      new AudioSound(this.envelope, this.scale),
    );
    this.fpAttributeSounds.set(FPAttributes.canvas2D, new CanvasSound(this.envelope, this.scale));
    this.fpAttributeSounds.set(FPAttributes.canvasWebGL, new WebGLSound(this.envelope, this.scale));
    this.fpAttributeSounds.set(
      FPAttributes.colorDepth,
      new ColorDepthSound(this.envelope, this.scale),
    );
    this.fpAttributeSounds.set(FPAttributes.timeZone, new TimezoneSound(this.envelope, this.scale));
  }
}
