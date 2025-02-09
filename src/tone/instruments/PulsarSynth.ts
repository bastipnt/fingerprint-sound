import { Oscillator } from "tone";

export default class PulsarSynth {
  // freq = 100; formantFreq = 400; pulsaretPhase = LFSaw.ar(freq, iphase: 1).linlin(-1, 1, 0, 1) * formantFreq / freq; pulsaretPhase;

  private saw = new Oscillator({ type: "sawtooth15", frequency: 100 });
}
