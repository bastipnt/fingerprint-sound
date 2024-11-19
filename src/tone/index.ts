import { FFT, getTransport, start, now as toneNow } from "tone";
import MyMixer from "./Mixer";
import FFTVisualisation from "./FFTVisualisation";
// import Sound1 from "./sounds/Sound1";
// import Sound2 from "./sounds/Sound2";
import Samples from "./Samples";
import BaseSound from "./sounds/BaseSound";
import Sound3 from "./sounds/Sound3";
import Sound4 from "./sounds/Sound4";
import SignalVisualisation from "./SignalVisualisation";

const VISUALISE = true;
const VISUALISATION_CHANNEL = "channel3";

class MyTone {
  static initialised = false;

  private mixer: MyMixer;
  private samples: Samples;
  private sounds: BaseSound[] = [];

  private tempo = 135.0;
  private fftVisualisation?: FFTVisualisation;
  private signalVisualisation?: SignalVisualisation;
  private setIsLoading: (loading: boolean) => void;

  constructor(setIsLoading: (loading: boolean) => void) {
    if (!MyTone.initialised) throw new Error("Tonejs not initialised");

    this.mixer = new MyMixer();
    this.samples = new Samples();
    this.setIsLoading = setIsLoading;
    getTransport().bpm.value = this.tempo;

    // this.sounds.push(new Sound1(this.mixer));
    // this.sounds.push(new Sound2(this.mixer, this.samples));
    // this.sounds.push(new Sound3(this.mixer));
    this.sounds.push(new Sound4(this.mixer, this.samples));
  }

  async play() {
    if (!MyTone.initialised) return;

    this.setIsLoading(true);

    await this.samples.init();
    getTransport().start();
    this.sounds.forEach((sound) => sound.play(toneNow()));

    this.fftVisualisation?.loop();
    this.signalVisualisation?.loop();
    this.setIsLoading(false);
  }

  stop() {
    if (!MyTone.initialised) return;
    getTransport().stop();
    this.sounds.forEach((sound) => sound.stop());
  }

  debugLogTime() {
    setInterval(() => console.log(toneNow()), 100);
  }

  addFFTVisualisation(fftCanvas: HTMLCanvasElement) {
    if (!VISUALISE) return;

    const fft = new FFT();
    this.mixer[VISUALISATION_CHANNEL]?.connect(fft);

    this.fftVisualisation = new FFTVisualisation(fftCanvas, fft);
  }

  addSignalisualisation(signalCanvas: HTMLCanvasElement) {
    if (!VISUALISE) return;

    this.signalVisualisation = new SignalVisualisation(signalCanvas);
    this.mixer[VISUALISATION_CHANNEL]?.connect(this.signalVisualisation.analyser);
  }

  static async init() {
    await start();
    MyTone.initialised = true;
  }
}

export default MyTone;
