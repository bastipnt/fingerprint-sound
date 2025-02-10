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

export type FPUpdateAttributes = Exclude<
  FPAttributes,
  FPAttributes.canvas2D | FPAttributes.canvasWebGL | FPAttributes.audioContext
>;

export type FPUpdateAttributesMap = Map<FPUpdateAttributes, string>;

export type FPValue = {
  ogValue: string;
  ogData: string | Float32Array;
  updatedValue?: string;
};

export type FPAttributesMap = Map<FPAttributes, FPValue>;
export type FPHashMap = Map<FPAttributes, string>;

export default class Fingerprint {
  readonly attributes: FPAttributesMap = new Map();

  async createFingerprint() {
    this.attributes.set(FPAttributes.timeZone, getTimeZoneFP());
    this.attributes.set(FPAttributes.screenSize, getScreenSize());
    this.attributes.set(FPAttributes.colorDepth, getColorDepth());
    this.attributes.set(FPAttributes.canvas2D, getCanvas2D());
    this.attributes.set(FPAttributes.canvasWebGL, await getCanvasWebGL());
    this.attributes.set(FPAttributes.audioContext, await getAudioContext());
  }

  updateFingerprint(newFPValues: FPUpdateAttributesMap) {
    for (const [attribute, updatedValue] of newFPValues) {
      const value = this.attributes.get(attribute);
      if (!value) return;

      value.updatedValue = updatedValue;
      this.attributes.set(attribute, value);
    }
  }

  /**
   * @use https://github.com/puleos/object-hash
   */
  get hashedAttributes(): FPHashMap {
    const hashedAttributes: FPHashMap = new Map();
    for (const [attribute, value] of this.attributes) {
      const valueToHash = value.updatedValue || value.ogValue;
      const hashedValue = hash(valueToHash);
      hashedAttributes.set(attribute, hashedValue);
    }
    return hashedAttributes;
  }

  get fingerprintId(): string {
    let valueString = "";

    for (const value of this.hashedAttributes.values()) {
      valueString += value;
    }

    return hash(valueString);
  }
}
