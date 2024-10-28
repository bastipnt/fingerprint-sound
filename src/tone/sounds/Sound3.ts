import BaseSound from "./BaseSound";
import MyMixer from "../Mixer";
import { AMOscillator, AutoFilter, LFO, getTransport } from "tone";
import { Frequency, Time } from "tone/build/esm/core/type/Units";

class Sound3 extends BaseSound {
  mainFreq: Frequency = "F2";
  mainOsc = new AMOscillator(this.mainFreq, "sine", "square");
  lfo = new LFO("1m", 2, 27);
  filter = new AutoFilter({ frequency: "5hz", depth: 0.6 });

  constructor(mixer: MyMixer) {
    super(mixer);
    this.init();
  }

  init(): void {
    this.mainOsc.chain(this.filter, this.mixer.channel3);
    this.mixer.channel3.set({ volume: -10 });
    this.lfo.chain(this.mainOsc.detune);

    getTransport().scheduleRepeat((time) => {
      this.mainOsc.harmonicity.setValueAtTime(0.5, time);
      // this.mainOsc.harmonicity.linearRampToValueAtTime(2.5, time + 1);
      // this.mainOsc.harmonicity.linearRampToValueAtTime(0.5, time + 2);
      this.mainOsc.harmonicity.setValueAtTime(1.5, time + 1);
      this.mainOsc.harmonicity.setValueAtTime(0.25, time + 2);
      this.mainOsc.harmonicity.setValueAtTime(1.75, time + 3);
      this.mainOsc.harmonicity.setValueAtTime(1, time + 4);
      // this.mainOsc.harmonicity.linearRampToValueAtTime(10, time + 3);
      // this.mainOsc.harmonicity.linearRampToValueAtTime(1, time + 4);

      // this.mainOsc.detune.setValueAtTime(0, time);
      // this.mainOsc.detune.linearRampToValueAtTime(20, time + 2);
      // this.mainOsc.detune.linearRampToValueAtTime(0, time + 4);
    }, 4);
  }

  play(time: Time) {
    this.mainOsc.start(time);
    this.lfo.start(time);
    this.filter.start(time);
  }

  stop() {
    this.mainOsc.stop();
    this.lfo.stop();
    this.filter.stop();
  }
}

export default Sound3;
