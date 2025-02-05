import { AmplitudeEnvelope, Gain, getTransport, start, now as toneNow } from "tone";
import { FPAttributes } from "../fingerprint";
import { FPAttributeName, FPAttributeValue, PlayState } from "../providers/soundProvider";
import AudioSound from "./sounds/AudioSound";
import BaseSound from "./sounds/BaseSound";
import CanvasSound from "./sounds/CanvasSound";
import ColorDepthSound from "./sounds/ColorDepthSound";
import ScreenSizeSound from "./sounds/ScreenSizeSound";
import TimezoneSound from "./sounds/TimezoneSound";
import WebGLSound from "./sounds/WebGLSound";
import FFTVisualisation from "./visualisation/FFTVisualisation";
import SignalVisualisation from "./visualisation/SignalVisualisation";

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

  private samplesLoaded = false;
  private setIsLoadingCallback: (loading: boolean) => void;
  private setGlobalPlayStateCallback: (newPlayState: PlayState) => void;
  private setSoundPlayStateCallback: (soundName: FPAttributes, newPlayState: PlayState) => void;

  private state: PlayState = PlayState.STOPPED;

  /**
   * main Envelope around everything
   * * only node connected to the -> destination
   */
  private mainEnvelope = new AmplitudeEnvelope(0.3, undefined, 1, 0.3).toDestination();

  /**
   * main Gain object
   */
  private mainGain = new Gain().connect(this.mainEnvelope);

  private sounds = new Map<FPAttributes, BaseSound>();

  /**
   * Tone default class constructor
   * @param setIsLoading
   */
  constructor(
    setIsLoadingCallback: (loading: boolean) => void,
    setGlobalPlayStateCallback: (newPlayState: PlayState) => void,
    setSoundPlayStateCallback: (soundName: FPAttributes, newPlayState: PlayState) => void,
  ) {
    if (!MyTone.initialised) throw new Error("Tonejs not initialised");

    this.setIsLoadingCallback = setIsLoadingCallback;
    this.setGlobalPlayStateCallback = setGlobalPlayStateCallback;
    this.setSoundPlayStateCallback = setSoundPlayStateCallback;

    getTransport().bpm.value = this.tempo;

    this.createSounds();
  }

  private createSounds() {
    this.sounds.set(
      FPAttributes.screenSize,
      new ScreenSizeSound(this.mainGain, (newState: PlayState) =>
        this.setSoundPlayStateCallback(FPAttributes.screenSize, newState),
      ),
    );
    this.sounds.set(
      FPAttributes.audioContext,
      new AudioSound(this.mainGain, (newState: PlayState) =>
        this.setSoundPlayStateCallback(FPAttributes.audioContext, newState),
      ),
    );
    this.sounds.set(
      FPAttributes.canvas2D,
      new CanvasSound(this.mainGain, (newState: PlayState) =>
        this.setSoundPlayStateCallback(FPAttributes.canvas2D, newState),
      ),
    );
    this.sounds.set(
      FPAttributes.canvasWebGL,
      new WebGLSound(this.mainGain, (newState: PlayState) =>
        this.setSoundPlayStateCallback(FPAttributes.canvasWebGL, newState),
      ),
    );
    this.sounds.set(
      FPAttributes.colorDepth,
      new ColorDepthSound(this.mainGain, (newState: PlayState) =>
        this.setSoundPlayStateCallback(FPAttributes.colorDepth, newState),
      ),
    );
    this.sounds.set(
      FPAttributes.timeZone,
      new TimezoneSound(this.mainGain, (newState: PlayState) =>
        this.setSoundPlayStateCallback(FPAttributes.timeZone, newState),
      ),
    );
  }

  async start() {
    if (!MyTone.initialised) return;
    if (this.state !== PlayState.STOPPED) return;

    if (!this.samplesLoaded) {
      this.setIsLoadingCallback(true);
      await this.load();
      this.samplesLoaded = true;
      this.setIsLoadingCallback(false);
    }

    const now = toneNow();
    getTransport().start(now);
    this.mainEnvelope.triggerAttack(now);

    this.fftVisualisation?.loop();
    this.signalVisualisation?.loop();

    this.sounds.forEach((sound) => sound.start(now));
    this.setPlayState(PlayState.STARTED);
  }

  stop() {
    if (!MyTone.initialised) return;
    if (this.state === PlayState.STOPPED) return;
    this.mainEnvelope.triggerRelease();

    getTransport().stop("+1");
    this.sounds.forEach((sound) => sound.stop("+2"));
    this.setPlayState(PlayState.STOPPED);
  }

  mute() {
    if (!MyTone.initialised) return;
    if (this.state !== PlayState.STARTED) return;
    this.mainEnvelope.triggerRelease();
    this.setPlayState(PlayState.MUTED);
  }

  unMute() {
    if (!MyTone.initialised) return;
    if (this.state !== PlayState.MUTED) return;
    this.mainEnvelope.triggerAttack(toneNow());
    this.setPlayState(PlayState.STARTED);
  }

  async unmuteAll() {
    if (!MyTone.initialised) return;
    if (this.state === PlayState.STOPPED) return;

    this.unMute();
    this.sounds.forEach((sound) => sound.unMute());
  }

  private async load() {
    for (const sound of this.sounds.values()) {
      await sound.load();
    }
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
   * Start fp attribute play
   * Only works when global is playing
   * @param attributeKey Key of the fingerprint attribute
   * @param value Value of the fingerprint attribute
   */
  unMuteSound(attributeKey: FPAttributes) {
    if (!MyTone.initialised) return;
    if (getTransport().state !== "started") return;
    this.sounds.get(attributeKey)?.unMute();
  }

  /**
   * Stop fp attribute play
   * Only works when global is playing
   * @param attributeKey Key of the fingerprint attribute
   */
  muteSound(attributeKey: FPAttributes) {
    if (!MyTone.initialised) return;
    this.sounds.get(attributeKey)?.mute();
  }

  updateVariables(name: FPAttributeName, value: FPAttributeValue) {
    for (const sound of this.sounds.values()) {
      sound.updateVariables(name, value);
    }
  }

  debugLogTime() {
    setInterval(() => console.log(toneNow()), 100);
  }

  /**
   * needs to be called before initialisation
   * waits for tone.js to start
   */
  static async init() {
    await start();
    MyTone.initialised = true;
  }

  private setPlayState(newPlayState: PlayState) {
    this.state = newPlayState;
    this.setGlobalPlayStateCallback(newPlayState);
  }
}

export default MyTone;
