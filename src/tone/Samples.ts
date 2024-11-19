import Sample from "./samples/Sample";

import itsGonnaRain from "../assets/samples/its-gonna-rain.mp3";
import kick from "../assets/samples/kick-rumble.wav";
import snare from "../assets/samples/phonk-snare_130bpm_C_minor.wav";
import hihat from "../assets/samples/metallic-hyperpop-hat_160bpm.wav";
import MSampler from "./samples/MSampler";

export enum AvailableSamples {
  rain = "its-gonna-rain",
  sampler1 = "sampler-1",
}

class Samples {
  samples = new Map<AvailableSamples, Sample | MSampler>();
  private use: AvailableSamples[] = [];
  initialised = false;

  constructor() {
    this.samples.set(
      AvailableSamples.rain,
      new Sample(itsGonnaRain, AvailableSamples.rain)
    );

    this.samples.set(
      AvailableSamples.sampler1,
      new MSampler(
        [
          { key: "C1", url: kick },
          { key: "D1", url: snare },
          { key: "E1", url: hihat },
        ],
        AvailableSamples.sampler1
      )
    );
  }

  async init() {
    if (this.initialised) return;

    await Promise.all(
      this.use.map((sampleName) => this.samples.get(sampleName)?.init())
    );

    this.initialised = true;
  }

  useSamples = (sampleNames: AvailableSamples | AvailableSamples[]) => {
    if (Array.isArray(sampleNames)) {
      this.use.push(...sampleNames);
    } else {
      this.use.push(sampleNames);
    }
  };
}

export default Samples;
