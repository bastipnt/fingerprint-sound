import { FMSynth } from "tone";
import SynthAndPattern1 from "../sounds/SynthAndPattern1";
import BaseComposition from "./BaseComposition";

export default class Composition extends BaseComposition {
  scale = "C4 minor";

  private sound1 = new SynthAndPattern1(this.envelope, {
    synth: new FMSynth({
      envelope: { attack: 0.001 },
      modulation: { type: "sawtooth" },
      modulationIndex: 10,
      volume: -6,
    }),
    patternName: "upDown",
    interval: "8n",
    effectChain: [],
    scale: this.scale,
    duration: "8n",
    notes: [1, 3, 5],
    on: true,
  });

  private sound2 = new SynthAndPattern1(this.envelope, {
    synth: new FMSynth({
      envelope: { attack: 0.001 },
      modulation: { type: "sawtooth" },
      modulationIndex: 10,
      volume: -6,
    }),
    patternName: "up",
    interval: "8n.",
    effectChain: [],
    scale: this.scale,
    duration: "8n",
    notes: [1, 3, 5],
    on: true,
  });

  private sound3 = new SynthAndPattern1(this.envelope, {
    synth: new FMSynth({
      envelope: { attack: 0.001 },
      modulation: { type: "sawtooth" },
      modulationIndex: 10,
      volume: -6,
    }),
    patternName: "upDown",
    interval: "1n",
    effectChain: [],
    scale: this.scale,
    duration: "1n",
    notes: [1, 3, 5],
    transpose: -10,
    on: true,
  });
}
