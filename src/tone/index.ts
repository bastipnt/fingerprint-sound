import { AmplitudeEnvelope, Loop, Oscillator, getTransport, start } from "tone";
import MyMixer from "./Mixer";

class MyTone {
  private loop: Loop;
  private osc1: Oscillator;
  private env: AmplitudeEnvelope;
  private mixer: MyMixer;
  static initialised = false;

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

    this.createLoop();
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

    this.loop.interval = "4n";
    this.loop.callback = (time) => {
      // this.synth.triggerAttackRelease("C4", "8n");
      // this.osc1.start().stop("+4n");
      this.env.triggerAttackRelease("2n", time);
    };
  }

  play() {
    if (!MyTone.initialised) return;
    getTransport().start();
  }

  stop() {
    if (!MyTone.initialised) return;
    getTransport().stop();
  }
}

export default MyTone;
