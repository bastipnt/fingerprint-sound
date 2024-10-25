import itsGonnaRain from "../assets/samples/its-gonna-rain.mp3";
import Sample from "./samples/Sample";

class Samples {
  samples = new Map<string, Sample>();
  initialised = false;

  constructor() {
    this.samples.set(
      "its-gonna-rain",
      new Sample(itsGonnaRain, "its-gonna-rain")
    );
  }

  async init() {
    if (this.initialised) return;

    await Promise.all(
      Array.from(this.samples.values()).map((sample) => {
        return sample.init();
      })
    );

    this.initialised = true;
  }
}

export default Samples;
