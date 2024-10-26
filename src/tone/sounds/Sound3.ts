import BaseSound from "./BaseSound";
import MyMixer from "../Mixer";
import { Add, LFO, Multiply, Oscillator } from "tone";
import { Frequency } from "tone/build/esm/core/type/Units";

class Sound3 extends BaseSound {
  saw = new Oscillator("A3", "sawtooth");
  // loop: Loop;
  lfo1 = new LFO({ frequency: "1m" });
  lfo2 = new LFO();
  mainFreq: Frequency = "A4";
  mainOsc = new Oscillator(this.mainFreq);
  scale = new Multiply(50);
  add = new Add(100);

  constructor(mixer: MyMixer) {
    super(mixer);
    this.init();

    // this.loop = new Loop(() => {
    //   this.mainOsc.set({ phase: 0 });
    // }, "154hz");
  }

  init(): void {
    this.mainOsc.connect(this.mixer.channel3);
    this.mixer.channel3.set({ volume: -10 });
    // this.lfo1.chain(this.scale, this.add, this.mainOsc.frequency);
  }

  play() {
    this.mainOsc.start(0);
    // this.lfo1.start();
    // this.loop.start();
  }

  stop() {
    this.lfo1.stop();
    // this.loop.stop();
    this.mainOsc.stop();
  }
}

export default Sound3;
