import { Pattern, NoiseSynth, AmplitudeEnvelope } from "tone";
import type { Monophonic, MonophonicOptions } from "tone/build/esm/instrument/Monophonic";
import type { PatternName } from "tone/build/esm/event/PatternGenerator";
import type { Time } from "tone/build/esm/core/type/Units";
import BaseSound, { BaseSoundOptions } from "./BaseSound";
import { map } from "../../util/number";

export type SynthAndPattern1Options<SynthType extends Monophonic<MonophonicOptions>> =
  BaseSoundOptions & {
    synth: SynthType | NoiseSynth;
    patternName: PatternName;
    interval: Time;
    duration: Time;
  };

class SynthAndPattern1<SynthType extends Monophonic<MonophonicOptions>> extends BaseSound {
  private synth: SynthType | NoiseSynth;
  private pattern: Pattern<number>;
  private patternIndexes: number[] = [];
  private duration: Time;

  private patternValues?: Array<0 | 1>;
  private noteRange?: [number, number];
  private notes?: number[];

  constructor(envelope: AmplitudeEnvelope, options: SynthAndPattern1Options<SynthType>) {
    super(envelope, options);

    this.synth = options.synth;
    this.duration = options.duration;

    if ("noteRange" in options) this.noteRange = options.noteRange;

    if ("patternValues" in options) {
      this.patternValues = options.patternValues;
      this.patternIndexes = Array.from(this.patternValues.keys());
    }

    if ("notes" in options) {
      this.notes = options.notes;
      this.patternIndexes = this.notes;
    }

    this.pattern = new Pattern({
      callback: this.patternCallback,
      interval: options.interval,
      pattern: options.patternName,
      values: this.patternIndexes,
    });

    this.pattern.start(0);
    this.connect();
  }

  connect = () => {
    if (!this.on) return;
    this.synth.connect(this.effectChain);
  };

  disconnect = () => {
    this.synth.disconnect(this.effectChain);
  };

  patternCallback = (time: Time, value?: number) => {
    if (value === undefined) return;
    let note: string;

    if (this.noteRange && this.patternValues) {
      const patternValue = this.patternValues[value];
      if (patternValue !== 1) return;

      note = this.getRndNoteFromScale(...this.noteRange);
    } else if (this.notes) {
      note = this.getNoteFromScale(value);
    } else return;

    if (this.synth instanceof NoiseSynth) {
      this.synth.triggerAttackRelease(this.duration, time, map(Math.random(), 0, 1, 0.3, 1));
    } else {
      this.synth.triggerAttackRelease(note, this.duration, time, map(Math.random(), 0, 1, 0.3, 1));
    }
  };
}

export default SynthAndPattern1;
