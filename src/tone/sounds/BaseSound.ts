import { AmplitudeEnvelope, Gain } from "tone";
import { Time } from "tone/build/esm/core/type/Units";

abstract class BaseSound {
  readonly scale: string;

  protected effectChain: Gain;
  // protected attributeValue: FPValue = "";

  constructor(envelope: AmplitudeEnvelope, scale: string) {
    this.scale = scale;
    this.effectChain = new Gain(1).chain(envelope);
  }

  abstract connect: () => void;
  abstract disconnect: () => void;

  abstract play: (time: Time) => void;
  abstract stop: (time: Time) => void;

  async loadSamples() {}

  // setAttributeValue(value: FPValue) {
  //   this.attributeValue = value;
  // }
}

export default BaseSound;
