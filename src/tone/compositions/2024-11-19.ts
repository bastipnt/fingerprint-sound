import { FMSynth } from "tone";
import SynthAndPattern1 from "../sounds/SynthAndPattern1";
import BaseComposition from "./BaseComposition";

export default class Composition extends BaseComposition {
  private sound1 = new SynthAndPattern1(this.envelope, {
    synth: new FMSynth({
      envelope: { attack: 0.001 },
      modulation: { type: "sawtooth" },
      modulationIndex: 10,
      volume: -6,
    }),
    patternValues: this.patternValues[0],
    patternName: "upDown",
    interval: "8n",
    effectChain: [],
    scale: this.scale,
    duration: "8n",
    noteRange: [0, 7],
    on: true,
  });
}
