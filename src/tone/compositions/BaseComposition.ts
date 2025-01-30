import { Scale } from "tonal";
import { AmplitudeEnvelope, type Gain } from "tone";
import type { Frequency, Time } from "tone/build/esm/core/type/Units";
import "../../Fingerprint";
import { FPAttributes } from "../../providers/fingerprintProvider";
import { mapFloor } from "../../util/number";
import BaseSound from "../sounds/BaseSound";

export type PatternValues = Array<Array<0 | 1>>;
// export type FPAttributeValues = {
//   [key in FPAttributes]: string;
// };

abstract class BaseComposition {
  scale = "C4 major";
  patternValues: PatternValues = [[1, 0, 1, 0]];

  readonly mainGain: Gain;
  protected readonly envelope: AmplitudeEnvelope;

  protected fpAttributeSounds = new Map<FPAttributes, BaseSound>();

  constructor(mainGain: Gain, attack = 1, release = 1) {
    this.mainGain = mainGain;
    this.envelope = new AmplitudeEnvelope(attack, undefined, 1, release);
    this.envelope.connect(this.mainGain);
  }

  async loadSamples() {
    for (const [_, sound] of this.fpAttributeSounds) {
      await sound.loadSamples();
    }
  }

  start(time: Time) {
    this.fpAttributeSounds.forEach((sound) => sound.play(time));
    this.envelope.triggerAttack(time);
  }

  stop(time: Time) {
    this.envelope.triggerRelease(time);
    this.fpAttributeSounds.forEach((sound) => sound.stop("+2"));
  }

  /**
   * Start fp attribute play
   * Only works when global is playing
   * @param attributeKey Key of the fingerprint attribute
   * @param value Value of the fingerprint attribute
   */
  async startFPAttribute(attributeKey: FPAttributes) {
    console.log("Start:", FPAttributes[attributeKey]);

    this.fpAttributeSounds.get(attributeKey)?.connect();
  }

  // setFPAttributeValues(fpAttributeValues: FPAttributeValues) {
  //   Object.entries(fpAttributeValues).forEach(([key, value]) =>
  //     this.fpAttributeSounds.get(key as FPAttributes)?.setAttributeValue(value),
  //   );
  // }

  /**
   * Stop fp attribute play
   * Only works when global is playing
   * @param attributeKey Key of the fingerprint attribute
   */
  async stopFPAttribute(attributeKey: FPAttributes) {
    console.log("Stop:", FPAttributes[attributeKey]);

    this.fpAttributeSounds.get(attributeKey)?.disconnect();
  }

  get scaleDegrees() {
    return Scale.degrees(this.scale);
  }

  protected getRndChordRythmPattern() {
    return this.patternValues[mapFloor(Math.random(), 0, 1, 0, this.patternValues.length)];
  }

  protected getRndChordNotes(range: [number, number]): Frequency[] {
    const chordRoot = mapFloor(Math.random(), 0, 1, range[0], range[1]);

    return this.getRndChordRythmPattern()
      .map((val, index) => {
        if (val === 0) return;
        let degree = chordRoot + index;
        // avoid 0
        if (chordRoot <= 0 && degree >= 0) degree += 1;
        return this.scaleDegrees(degree);
      })
      .filter((note) => !!note) as Frequency[];
  }
}

export default BaseComposition;
