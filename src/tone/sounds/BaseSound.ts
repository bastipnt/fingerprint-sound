import { AmplitudeEnvelope, Gain, type InputNode } from "tone";
import { Scale } from "tonal";
import { mapFloor } from "../../util/number";

abstract class BaseSound {
  readonly scale: string;
  readonly scaleDegrees: (degree: number) => string;
  effectChain: Gain;
  protected on: boolean;

  constructor(envelope: AmplitudeEnvelope, scale: string, effectChain: InputNode[], on?: boolean) {
    this.scale = scale;
    this.scaleDegrees = Scale.degrees(this.scale);
    this.effectChain = new Gain(1).chain(...effectChain, envelope);
    this.on = on === undefined ? true : on;
  }

  abstract connect: () => void;
  abstract disconnect: () => void;

  protected getRndNoteFromScale(...range: [number, number]) {
    let noteDegree = mapFloor(Math.random(), 0, 1, range[0], range[1]);
    if (noteDegree >= 0) noteDegree += 1;
    return this.scaleDegrees(noteDegree);
  }
}

export default BaseSound;
