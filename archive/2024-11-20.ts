import { FMSynth, Gain, now as toneNow } from "tone";
import SynthAndPattern1 from "../sounds/SynthAndPattern1";
import BaseComposition from "./BaseComposition";
import { map } from "../../util/number";

export default class Composition extends BaseComposition {
  scale = "C4 minor";

  sound1 = new SynthAndPattern1(this.envelope, {
    synthClass: FMSynth,
    synthOptions: {
      envelope: { attack: 0.001 },
      modulation: { type: "sawtooth" },
      oscillator: { type: "fmsquare6" },
      modulationIndex: 10,
      volume: -6,
    },
    patternName: "up",
    interval: "4n",
    effectChain: [],
    scale: this.scale,
    duration: "4n",
    notes: [1, 3, 5],
    on: true,
    iterations: 6,
  });

  constructor(mainGain: Gain) {
    super(mainGain);

    window.addEventListener("mousemove", (e) => {
      this.sound1.synth.set({
        oscillator: { modulationIndex: map(e.clientX, 3, window.innerWidth - 3, 0, 200) },
      });
      // console.log(e.clientX, e.clientY);
    });

    window.addEventListener("mousedown", () => {
      this.sound1.play(toneNow());
    });
  }
}
