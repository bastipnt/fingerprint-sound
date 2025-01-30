import { AmplitudeEnvelope, Sequence, Synth } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import BaseSound from "./BaseSound";

class ColorDepthSound extends BaseSound {
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

  constructor(envelope: AmplitudeEnvelope, scale: string) {
    super(envelope, scale);
  }

  connect = () => {
    this.synth.connect(this.effectChain);
  };

  disconnect = () => {
    this.synth.disconnect(this.effectChain);
  };

  play = (time: Time) => {
    this.seq.start(time);
  };

  stop = (time: Time) => {
    this.seq.stop(time);
  };
}

export default ColorDepthSound;
