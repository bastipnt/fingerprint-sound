import { FFT, Loop, getTransport, start, now as toneNow } from "tone";
import MyMixer from "./Mixer";
import Visualisation from "./Visualisation";
import Sound1 from "./Sound1";
import Sound2 from "./Sound2";
import Samples from "./Samples";
import BaseSound from "./BaseSound";

class MyTone {
  static initialised = false;

  // Misc
  private loop: Loop;
  private mixer: MyMixer;
  private samples: Samples;
  private sounds: BaseSound[] = [];

  private tempo = 120.0;

  private visualisation?: Visualisation;

  private setIsLoading: (loading: boolean) => void;

  constructor(setIsLoading: (loading: boolean) => void) {
    if (!MyTone.initialised) throw new Error("Tonejs not initialised");

    this.mixer = new MyMixer();
    this.loop = new Loop();
    this.samples = new Samples();
    this.setIsLoading = setIsLoading;

    getTransport().bpm.value = this.tempo;

    // this.createLoop();
    this.sounds.push(new Sound1(this.mixer));

    this.sounds.push(
      new Sound2(this.mixer, this.samples.samples.get("its-gonna-rain"))
    );
  }

  static async init() {
    await start();

    MyTone.initialised = true;
  }

  private createLoop() {
    this.loop.start(0);
    this.loop.interval = "4n";

    this.loop.callback = (time) => {
      // this.synth.triggerAttackRelease("C4", "8n");
      // this.osc1.start().stop("+4n");
      // this.env.triggerAttackRelease("2n", time);
    };

    // this.osc1.type = "sine";
    // this.osc1.frequency.value = "C4";
    // this.osc1.connect(this.env).start();

    // // for iOS ???
    // this.osc1.context.resume();
  }

  async play() {
    if (!MyTone.initialised) return;

    this.setIsLoading(true);

    await this.samples.init();
    getTransport().start();
    this.sounds.forEach((sound) => sound.play());

    this.visualisation?.loop();

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
    const fft = new FFT();
    this.mixer.channel1.connect(fft);

    this.visualisation = new Visualisation(fftCanvas, fft);
  }
}

export default MyTone;
