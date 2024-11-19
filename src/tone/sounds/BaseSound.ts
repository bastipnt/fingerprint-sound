import { AmplitudeEnvelope, Gain, type InputNode } from "tone";
import { Scale } from "tonal";
import { mapFloor } from "../../util/number";

interface CommonBaseSoundOptions {
  effectChain: InputNode[];
  scale: string;
  transpose?: number;
  debug?: boolean;
  on?: boolean;
}

interface BaseSoundOptionsWithNotes extends CommonBaseSoundOptions {
  notes: number[];
}

interface BaseSoundOptionsWithNoteRange extends CommonBaseSoundOptions {
  noteRange: [number, number];
  patternValues: Array<0 | 1>;
}

export type BaseSoundOptions = BaseSoundOptionsWithNotes | BaseSoundOptionsWithNoteRange;

abstract class BaseSound {
  readonly scale: string;
  readonly scaleDegrees: (degree: number) => string;
  protected transpose: number;

  protected effectChain: Gain;

  protected on: boolean;
  protected debug: boolean;

  constructor(envelope: AmplitudeEnvelope, options: BaseSoundOptions) {
    this.scale = options.scale;
    this.scaleDegrees = Scale.degrees(this.scale);
    this.effectChain = new Gain(1).chain(...options.effectChain, envelope);
    this.on = options.on === undefined ? true : options.on;
    this.debug = options.debug === undefined ? false : options.debug;
    this.transpose = options.transpose || 0;
  }

  abstract connect: () => void;
  abstract disconnect: () => void;

  protected getRndNoteFromScale(...range: [number, number]) {
    let noteDegree = mapFloor(Math.random(), 0, 1, range[0], range[1]) + this.transpose;
    if (noteDegree >= 0) noteDegree += 1;

    const note = this.scaleDegrees(noteDegree);
    if (this.debug) console.log("Note:", note);

    return note;
  }

  protected getNoteFromScale(noteIndex: number) {
    if (noteIndex === 0) return "";
    let transposedNoteIndex = noteIndex + this.transpose;

    if (transposedNoteIndex === 0) {
      transposedNoteIndex = this.transpose < 0 ? transposedNoteIndex - 1 : transposedNoteIndex + 1;
    }

    let note = this.scaleDegrees(transposedNoteIndex);
    if (this.debug) console.log("Note:", note);

    return note;
  }
}

export default BaseSound;
