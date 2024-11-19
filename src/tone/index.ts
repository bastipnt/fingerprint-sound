import { FFT, getTransport, start, now as toneNow } from "tone";

import FFTVisualisation from "./visualisation/FFTVisualisation";
import SignalVisualisation from "./visualisation/SignalVisualisation";

const VISUALISE = true;
// const VISUALISATION_CHANNEL = "channel3";

class MyTone {
  static initialised = false;

  private tempo = 135.0;
  private fftVisualisation?: FFTVisualisation;
  private signalVisualisation?: SignalVisualisation;

  private setIsLoading: (loading: boolean) => void;

  constructor(setIsLoading: (loading: boolean) => void) {
    if (!MyTone.initialised) throw new Error("Tonejs not initialised");

    this.setIsLoading = setIsLoading;
    getTransport().bpm.value = this.tempo;
  }

  async play() {
    if (!MyTone.initialised) return;
    this.setIsLoading(true);

    getTransport().start();
    this.fftVisualisation?.loop();
    this.signalVisualisation?.loop();

    this.setIsLoading(false);
  }

  stop() {
    if (!MyTone.initialised) return;
    getTransport().stop();
  }

  debugLogTime() {
    setInterval(() => console.log(toneNow()), 100);
  }

  addFFTVisualisation(fftCanvas: HTMLCanvasElement) {
    if (!VISUALISE) return;
    const fft = new FFT();
    this.fftVisualisation = new FFTVisualisation(fftCanvas, fft);
  }

  addSignalisualisation(signalCanvas: HTMLCanvasElement) {
    if (!VISUALISE) return;
    this.signalVisualisation = new SignalVisualisation(signalCanvas);
  }

  static async init() {
    await start();
    MyTone.initialised = true;
  }
}

export default MyTone;
