import {
  AmplitudeEnvelope,
  FFT,
  Loop,
  Merge,
  Oscillator,
  Reverb,
  Sequence,
  Synth,
  getTransport,
  start,
  now as toneNow,
} from "tone";
import MyMixer from "./Mixer";
import Visualisation from "./Visualisation";

class MyTone {
  static initialised = false;

  // Misc
  private loop: Loop;
  private mixer: MyMixer;
  private merge1: Merge;
  private reverb1: Reverb;

  // Instruments
  private osc1: Oscillator;
  private env: AmplitudeEnvelope;

  private synth1: Synth;
  private synth2: Synth;

  private part1: Sequence;
  private part2: Sequence;

  private tempo = 120.0;

  private visualisation?: Visualisation;

  constructor() {
    if (!MyTone.initialised) throw new Error("Tonejs not initialised");

    this.mixer = new MyMixer();
    this.loop = new Loop();
    this.osc1 = new Oscillator();

    this.env = new AmplitudeEnvelope({
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 0.8,
    }).connect(this.mixer.channel1);

    this.merge1 = new Merge();
    this.reverb1 = new Reverb({ wet: 0.3 });
    this.merge1.chain(this.reverb1, this.mixer.channel2);

    this.synth1 = new Synth({
      oscillator: {
        type: "custom",
        partials: [2, 1, 2, 2],
      },
      envelope: {
        attack: 0.005,
        decay: 0.3,
        sustain: 0.2,
        release: 1,
      },
      portamento: 0.01,
      volume: -20,
    }).connect(this.merge1, 0, 0);

    this.synth2 = new Synth({
      oscillator: {
        type: "custom",
        partials: [2, 1, 2, 2],
      },
      envelope: {
        attack: 0.005,
        decay: 0.3,
        sustain: 0.2,
        release: 1,
      },
      portamento: 0.01,
      volume: -20,
    }).connect(this.merge1, 0, 1);

    this.part1 = new Sequence(
      (time, note) => {
        this.synth1.triggerAttackRelease(note, "8n", time);
      },
      [
        "E4",
        "F#4",
        "B4",
        "C#5",
        "D5",
        "F#4",
        "E4",
        "C#5",
        "B4",
        "F#4",
        "D5",
        "C#5",
      ],
      "8n"
    );

    this.part2 = new Sequence(
      (time, note) => {
        this.synth2.triggerAttackRelease(note, "8n", time);
      },
      [
        "E4",
        "F#4",
        "B4",
        "C#5",
        "D5",
        "F#4",
        "E4",
        "C#5",
        "B4",
        "F#4",
        "D5",
        "C#5",
      ],
      "8n"
    ).start("2m");

    this.part2.playbackRate = 0.985;

    getTransport().bpm.value = this.tempo;

    this.createLoop();
    this.part1.start(0);
    this.part2.start("2m");
  }

  static async init() {
    await start();

    MyTone.initialised = true;
  }

  private createLoop() {
    this.loop.start(0);
    this.osc1.type = "sine";
    this.osc1.frequency.value = "C4";
    this.osc1.connect(this.env).start();

    // // for iOS ???
    // this.osc1.context.resume();

    this.loop.interval = "4n";
    this.loop.callback = (time) => {
      // this.synth.triggerAttackRelease("C4", "8n");
      // this.osc1.start().stop("+4n");
      // this.env.triggerAttackRelease("2n", time);
    };
  }

  play() {
    if (!MyTone.initialised) return;
    getTransport().start();
    this.visualisation?.loop();
  }

  stop() {
    if (!MyTone.initialised) return;
    getTransport().stop();
  }

  debugLogTime() {
    setInterval(() => console.log(toneNow()), 100);
  }

  addFFTVisualisation(fftCanvas: HTMLCanvasElement) {
    const fft = new FFT();
    this.mixer.channel2.connect(fft);

    this.visualisation = new Visualisation(fftCanvas, fft);
  }
}

export default MyTone;
