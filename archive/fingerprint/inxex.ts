import { MD5 } from "object-hash";
import FPCanvas from "./FPCanvas";
import FPStore from "./FPStore";
import fpCreationAttributes from "./fpCreationAttributes";
import {
  FPAreas,
  FPAttribute,
  FPAttributeTypes,
  FPStoreItem,
  FPValue,
} from "./types.d";

class Fingerprint {
  private creationAttributes = fpCreationAttributes;
  fingerprint = new Map<FPAreas, FPStoreItem[]>();
  fingerprintValues = new Map<FPAreas, FPValue[]>();
  private fpCanvas = new FPCanvas();
  private fpStore = new FPStore();

  create() {
    this.createFromAttributes();

    const canvasFP2D = this.fpCanvas.create2D();
    this.fingerprint.set(FPAreas.CANVAS_2D_IMAGE, [
      { label: "canvas2D-image", hash: canvasFP2D },
    ]);

    this.fingerprintValues.forEach((fpValues, key) => {
      const hashedFPValues: FPStoreItem[] = fpValues.map(
        ({ label, value }) => ({
          label,
          hash: value ? MD5(value) : "not-possible",
        })
      );
      this.fingerprint.set(key, hashedFPValues);
    });

    this.fpStore.saveFP(this.fingerprint);
    console.log({ comparison: this.fpStore.comparisonMap });
    console.log("sameness rate:", this.fpStore.samenessRate);
    console.log("different keys:", this.fpStore.listOfNotSameKeys);
  }

  private createFromAttributes() {
    const documentValues = this.creationAttributes.document.attributes?.flatMap(
      (attribute) => this.getValuesFromFPAttribute(document, attribute)
    );

    const mathValues = this.creationAttributes.Math.attributes?.flatMap(
      (attribute) => this.getValuesFromFPAttribute(Math, attribute)
    );

    const windowValues = this.creationAttributes.window.attributes?.flatMap(
      (attribute) => this.getValuesFromFPAttribute(window, attribute)
    );

    const navigatorValues =
      this.creationAttributes.navigator.attributes?.flatMap((attribute) =>
        this.getValuesFromFPAttribute(navigator, attribute)
      );

    const screenValues = this.creationAttributes.screen.attributes?.flatMap(
      (attribute) => this.getValuesFromFPAttribute(screen, attribute)
    );

    // Audio
    const audioContext = new AudioContext();
    const audioContextValues = this.creationAttributes[
      "audio-context"
    ].attributes.flatMap((attribute) =>
      this.getValuesFromFPAttribute(audioContext, attribute)
    );

    const audioAnalyser = audioContext.createAnalyser();
    const audioAnalyserValues = this.creationAttributes[
      "audio-analyser"
    ].attributes.flatMap((attribute) =>
      this.getValuesFromFPAttribute(audioAnalyser, attribute)
    );

    const audioDestination = audioContext.destination;
    const audioDestinationValues = this.creationAttributes[
      "audio-destination"
    ].attributes.flatMap((attribute) =>
      this.getValuesFromFPAttribute(audioDestination, attribute)
    );

    // cleanup audio context
    audioDestination.disconnect();
    audioAnalyser.disconnect();
    audioContext.close();

    // Canvas
    const canvas2D = document.createElement("canvas");
    document.body.appendChild(canvas2D);
    const ctx2D = canvas2D.getContext("2d");
    if (ctx2D) {
      const canvas2DValues = this.creationAttributes[
        "canvas-2D"
      ].attributes.flatMap((attribute) =>
        this.getValuesFromFPAttribute(ctx2D, attribute)
      );
      this.fingerprintValues.set(FPAreas.CANVAS_2D, canvas2DValues);
    }

    const canvasWebGL = document.createElement("canvas");
    document.body.appendChild(canvasWebGL);
    const ctxwebGL = canvasWebGL.getContext("webgl");
    if (ctxwebGL) {
      const canvasWebGLValues = this.creationAttributes[
        "canvas-webGL"
      ].attributes.flatMap((attribute) =>
        this.getValuesFromFPAttribute(ctxwebGL, attribute)
      );
      this.fingerprintValues.set(FPAreas.CANVAS_WEBGL, canvasWebGLValues);
    }

    const canvasWebGL2 = document.createElement("canvas");
    document.body.appendChild(canvasWebGL2);
    const ctxwebGL2 = canvasWebGL2.getContext("webgl2");
    if (ctxwebGL2) {
      const canvasWebGL2Values = this.creationAttributes[
        "canvas-webGL2"
      ].attributes.flatMap((attribute) =>
        this.getValuesFromFPAttribute(ctxwebGL2, attribute)
      );
      this.fingerprintValues.set(FPAreas.CANVAS_WEBGL2, canvasWebGL2Values);
    }

    this.fingerprintValues.set(FPAreas.DOCUMENT, documentValues);
    this.fingerprintValues.set(FPAreas.MATH, mathValues);
    this.fingerprintValues.set(FPAreas.NAVIGATOR, navigatorValues);
    this.fingerprintValues.set(FPAreas.WINDOW, windowValues);
    this.fingerprintValues.set(FPAreas.SCREEN, screenValues);
    this.fingerprintValues.set(FPAreas.AUDIO_CONTEXT, audioContextValues);
    this.fingerprintValues.set(FPAreas.AUDIO_ANALYSER, audioAnalyserValues);
    this.fingerprintValues.set(
      FPAreas.AUDIO_DESTINATION,
      audioDestinationValues
    );
  }

  private getValuesFromFPAttribute<T extends object>(
    area: T,
    attribute: FPAttribute<T>
  ): FPValue[] {
    let value: FPValue[] = [];

    switch (attribute.type) {
      case FPAttributeTypes.ATTRIBUTE:
      case FPAttributeTypes.FN:
      case FPAttributeTypes.CLASS:
      case FPAttributeTypes.SUPPORTS:
        value.push({
          label: attribute.label,
          value: this.checkValue(
            this.getValueFromAttributeFnClass(area, attribute)
          ),
        });
        break;

      case FPAttributeTypes.NESTED_ATTRIBUTE:
      case FPAttributeTypes.NESTED_FN:
      case FPAttributeTypes.NESTED_CLASS:
        const nestedArea = this.getValueFromAttributeFnClass(area, attribute);
        attribute.attributes.forEach((nestedAttribute) => {
          value.push(
            ...this.getValuesFromFPAttribute(nestedArea, {
              ...nestedAttribute,
              label: `${attribute.label}.${nestedAttribute.label}`,
            })
          );
        });
        break;

      case FPAttributeTypes.LISTS:
        value.push({
          label: attribute.label,
          value: JSON.stringify(area),
        });
        break;
    }

    return value;
  }

  private checkValue(value: any): FPValue["value"] {
    if (
      typeof value === "boolean" ||
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "undefined" ||
      value === null
    )
      return value;

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return "other";
  }

  private getValueFromAttributeFnClass<T extends object>(
    area: T,
    attribute: FPAttribute<T>
  ): T[keyof T] | "unknown" | "error" | string {
    try {
      if ("key" in attribute) {
        return this.getValueFromAttributeFnClassHelper(
          area,
          attribute.key,
          attribute.type,
          // @ts-ignore
          attribute?.callParameters
        );
      } else if ("name" in attribute) {
        return this.getValueFromAttributeFnClassHelper(
          area,
          attribute.name,
          attribute.type,
          // @ts-ignore
          attribute?.callParameters
        );
      }

      return "unknown";
    } catch (e) {
      return e instanceof Error ? e.message : "error";
    }
  }

  getValueFromAttributeFnClassHelper<T extends object>(
    area: T,
    key: string | number | symbol,
    type: FPAttributeTypes,
    callParameters: (string | number)[] = []
  ): T[keyof T] | "unknown" {
    let value: "unknown" | T[keyof T] = "unknown";

    if (typeof area !== "object") return value;

    if (!(key in area)) return value;

    switch (type) {
      case FPAttributeTypes.ATTRIBUTE:
      case FPAttributeTypes.NESTED_ATTRIBUTE:
      case FPAttributeTypes.SUPPORTS:
        value = area[key as keyof T];
        break;

      case FPAttributeTypes.FN:
      case FPAttributeTypes.NESTED_FN:
        if (typeof area[key as keyof T] !== "function") return value;
        value = (area[key as keyof T] as (...args: (string | number)[]) => any)(
          ...callParameters
        );
        break;

      case FPAttributeTypes.CLASS:
      case FPAttributeTypes.NESTED_CLASS:
        const klass = area[key as keyof T];
        if (typeof klass !== "object") return value;
        value = new (klass as new (...args: (string | number)[]) => any)(
          ...callParameters
        );
        break;
    }

    return value;
  }
}

export default Fingerprint;
