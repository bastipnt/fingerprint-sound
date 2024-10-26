import itsGonnaRain from "../assets/samples/its-gonna-rain.mp3";
import Sample from "./samples/Sample";

export enum AvailableSamples {
  rain = "its-gonna-rain",
}

class Samples {
  samples = new Map<AvailableSamples, Sample>();
  private use: AvailableSamples[] = [];
  initialised = false;

  constructor() {
    this.samples.set(
      AvailableSamples.rain,
      new Sample(itsGonnaRain, AvailableSamples.rain)
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
