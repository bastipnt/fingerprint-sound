import { Merge, Reverb, Sequence, Synth } from "tone";
import MyMixer from "./Mixer";
import BaseSound from "./BaseSound";

class Sound1 extends BaseSound {
  private merge1: Merge;
  private reverb1: Reverb;

  private synth1: Synth;
  private synth2: Synth;

  private part1: Sequence;
  private part2: Sequence;

  constructor(mixer: MyMixer) {
    super(mixer);

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
  }

  play(): void {
    this.part1.start(0);
    this.part2.start("2m");
  }

  stop(): void {
    this.part1.stop();
    this.part2.stop();
  }
}

export default Sound1;
