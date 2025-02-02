import hash from "object-hash";
import { getAudioContext } from "./AudioContext";
import { getCanvas2D } from "./Canvas2D";
import { getCanvasWebGL } from "./CanvasWebGL";
import { getColorDepth } from "./ColorDepth";
import { getScreenSize } from "./ScreenSize";
import { getTimeZoneFP } from "./TimeZone";

export enum FPAttributes {
  "timeZone",
  "screenSize",
  "colorDepth",
  "canvas2D",
  "canvasWebGL",
  "audioContext",
}

export default class Fingerprint {
  fingerprintId?: string;
  hashedAttributes = new Map<FPAttributes, string>();
  attributes = new Map<FPAttributes, string | Float32Array>();

  async createFingerprint() {
    this.attributes.set(FPAttributes.timeZone, getTimeZoneFP());
    this.attributes.set(FPAttributes.screenSize, getScreenSize());
    this.attributes.set(FPAttributes.colorDepth, getColorDepth());
    this.attributes.set(FPAttributes.canvas2D, getCanvas2D());
    const [webGLData, webGLImage] = await getCanvasWebGL();
    this.attributes.set(FPAttributes.canvasWebGL, webGLData);
    const [audioHash, audioArr] = await getAudioContext();
    this.attributes.set(FPAttributes.audioContext, audioHash);

    this.hashAttributes();

    // overwrite
    this.attributes.set(FPAttributes.canvasWebGL, webGLImage);
    this.attributes.set(FPAttributes.audioContext, audioArr);

    this.fingerprintId = this.generateFingerprintId();
  }

  /**
   * @use https://github.com/puleos/object-hash
   */
  private hashAttributes() {
    for (const [attribute, value] of this.attributes) {
      const hashedValue = hash(value);
      this.hashedAttributes.set(attribute, hashedValue);
    }
  }

  private generateFingerprintId() {
    let valueString = "";

    for (const value of this.hashedAttributes.values()) {
      valueString += value;
    }

    return hash(valueString);
  }
}
