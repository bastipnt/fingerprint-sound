import { AmplitudeEnvelope, Gain, getTransport, start, now as toneNow } from "tone";

import FFTVisualisation from "./visualisation/FFTVisualisation";
import SignalVisualisation from "./visualisation/SignalVisualisation";
import Composition from "./compositions/2024-11-19";

const VISUALISE = true;

/**
 * This loads all tone.js functionality
 */
class MyTone {
  /**
   * Setup
   */
  static initialised = false;

  private tempo = 135.0;
  private fftVisualisation?: FFTVisualisation;
  private signalVisualisation?: SignalVisualisation;

  private setIsLoading: (loading: boolean) => void;

  /**
   * main Envelope around everything
   * * only node connected to the -> destination
   */
  private mainEnvelope = new AmplitudeEnvelope(0.3, undefined, 1, 0.3).toDestination();

  /**
   * main Gain object
   */
  private mainGain = new Gain().connect(this.mainEnvelope);

  /**
   * The composition to be played
   */
  private composition = new Composition(this.mainGain);

  /**
   * Tone default class constructor
   * @param setIsLoading
   */
  constructor(setIsLoading: (loading: boolean) => void) {
    if (!MyTone.initialised) throw new Error("Tonejs not initialised");

    this.setIsLoading = setIsLoading;
    getTransport().bpm.value = this.tempo;
  }

  async start() {
    if (!MyTone.initialised) return;
    this.setIsLoading(true);

    const now = toneNow();

    this.composition.start(now);
    getTransport().start(now);
    this.mainEnvelope.triggerAttack(0);

    this.fftVisualisation?.loop();
    this.signalVisualisation?.loop();

    this.setIsLoading(false);
  }

  stop() {
    if (!MyTone.initialised) return;
    this.mainEnvelope.triggerRelease();

    getTransport().stop("+1");
    this.composition.stop("+2");
  }

  debugLogTime() {
    setInterval(() => console.log(toneNow()), 100);
  }

  addFFTVisualisation(fftCanvas: HTMLCanvasElement) {
    if (!VISUALISE) return;
    this.fftVisualisation = new FFTVisualisation(fftCanvas);
    this.mainEnvelope.connect(this.fftVisualisation.fftAnalyser);
  }

  addSignalisualisation(signalCanvas: HTMLCanvasElement) {
    if (!VISUALISE) return;
    this.signalVisualisation = new SignalVisualisation(signalCanvas);
    this.mainEnvelope.connect(this.signalVisualisation.analyser);
  }

  /**
   * needs to be called before initialisation
   * waits for tone.js to start
   */
  static async init() {
    await start();
    MyTone.initialised = true;
  }
}

export default MyTone;
