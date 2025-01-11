import { Pattern, NoiseSynth, AmplitudeEnvelope } from "tone";
import type { Monophonic, MonophonicOptions } from "tone/build/esm/instrument/Monophonic";
import type { PatternName } from "tone/build/esm/event/PatternGenerator";
import type { Time } from "tone/build/esm/core/type/Units";
import BaseSound, { BaseSoundOptions } from "./BaseSound";
import { map } from "../../util/number";
import { Source, SourceOptions } from "tone/build/esm/source/Source";

type SynthType<Options extends MonophonicOptions | SourceOptions> =
  Options extends MonophonicOptions ? Options & MonophonicOptions : Options & SourceOptions;

export type SynthAndPattern1Options<SynthOptions extends MonophonicOptions | SourceOptions> =
  BaseSoundOptions & {
    synthClass: new (options: SynthOptions) => SynthType<SynthOptions>;
    synthOptions: SynthOptions;
    patternName: PatternName;
    interval: Time;
    duration: Time;
    iterations?: number;
    autostart?: boolean;
  };

class SynthAndPattern1<SynthOptions extends MonophonicOptions | SourceOptions> extends BaseSound {
  private synthClass: new (options: SynthOptions) => SynthType<SynthOptions>;
  private synthOptions: SynthOptions;
  private synths: SynthType<SynthOptions>[] = [];
  private pattern: Pattern<number>;
  private patternIndexes: number[] = [];
  private duration: Time;
  private iterations: number;
  private autostart: boolean;

  private patternValues?: Array<0 | 1>;
  private noteRange?: [number, number];
  private notes?: number[];

  constructor(envelope: AmplitudeEnvelope, options: SynthAndPattern1Options<SynthOptions>) {
    super(envelope, options);

    this.synthClass = options.synthClass;
    this.synthOptions = options.synthOptions;
    this.duration = options.duration;
    this.iterations = options.iterations !== undefined ? options.iterations : Infinity;
    this.autostart = options.autostart !== undefined ? options.autostart : true;

    const numOfSynths = 4;
    for (let i = 0; i < numOfSynths; i++) {
      this.synths.push(new this.synthClass(this.synthOptions));
    }

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
      iterations: this.iterations,
    });

    if (this.autostart) this.pattern.start(0);
    this.connect();
  }

  connect = () => {
    if (!this.on) return;
    this.synth.connect(this.effectChain);
  };

  disconnect = () => {
    this.synth.disconnect(this.effectChain);
  };

  play(time: Time) {
    // if (this.pattern.state === "started") return;
    console.log("pressed", this.pattern.state);
    this.pattern.stop();
    this.pattern.start(time);

    // this.pattern.stop("+3");
    // this.pattern.start("+3");
  }

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
