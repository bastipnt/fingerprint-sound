import BaseSound from "./BaseSound";
import MyMixer from "../Mixer";
import Sample from "../samples/Sample";
import Samples, { AvailableSamples } from "../Samples";

class Sound2 extends BaseSound {
  private sample?: Sample;

  constructor(mixer: MyMixer, samples: Samples) {
    super(mixer, samples);

    this.samples?.useSamples(AvailableSamples.rain);
    this.sample = this.samples?.samples.get(AvailableSamples.rain);

    this.init();
  }

  init() {
    if (!this.sample) return;

    this.sample.player.loop = true;
    this.sample.player.loopStart = 2.98;
    this.sample.player.loopEnd = 3.8;
    this.sample.player.connect(this.mixer.channel1);
  }

  play() {
    if (!this.sample) return;

    this.sample.player.start();
  }

  stop() {
    if (!this.sample) return;

    this.sample.player.stop();
  }
}

export default Sound2;
