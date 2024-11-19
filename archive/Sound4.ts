import BaseComposition from "./BaseComposition";
import MyMixer from "../Mixer";
import { Loop, Sampler } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import MSampler from "../samples/MSampler";
import Samples, { AvailableSamples } from "../Samples";

class Sound4 extends BaseComposition {
  samples: Samples;
  sampler: Sampler;

  breakLoop = new Loop((time) => {
    if (Math.random() > 0.75) {
      this.sampler.triggerAttackRelease("C1", "16n", time + 1);
    } else {
      this.sampler.triggerAttackRelease("C1", "8n", time + 0.5);
    }
    this.sampler.triggerAttackRelease("D1", "8n", time + 1);
    this.sampler.triggerAttackRelease("E1", "8n", time + 3);
    this.sampler.triggerAttackRelease("D1", "8n", time + 2);
  }, 4);

  constructor(mixer: MyMixer, samples: Samples) {
    super(mixer);
    this.samples = samples;
    this.samples.useSamples(AvailableSamples.sampler1);

    this.sampler = (this.samples.samples.get(AvailableSamples.sampler1) as MSampler).sampler;

    this.init();
  }

  init() {
    this.mixer.channel3.set({ volume: -10 });
    this.sampler.connect(this.mixer.channel3);
  }

  play(time: Time) {
    this.breakLoop.start(time);
  }

  stop() {
    this.breakLoop.stop;
  }
}

export default Sound4;
