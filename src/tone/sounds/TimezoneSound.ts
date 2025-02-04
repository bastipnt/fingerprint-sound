import { Gain, Sequence, Synth } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { PlayState } from "../../providers/soundProvider";
import BaseSound from "./BaseSound";

class TimezoneSound extends BaseSound {
  synth = new Synth({
    oscillator: {
      type: "custom",
      partials: [2, 1, 2, 2],
    },
    envelope: {
      attack: 0.005,
      decay: 0.3,
      sustain: 0.2,
      release: 1,
    },
    portamento: 0.01,
    volume: -20,
  });

  seq = new Sequence(
    (time, note) => {
      this.synth.triggerAttackRelease(note, "8n", time);
    },
    ["E4", "F#4", "B4", "C#5", "D5", "F#4", "E4", "C#5", "B4", "F#4", "D5", "C#5"],
    "8n",
  );

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.synth.connect(this.envelope);
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };
}

export default TimezoneSound;
