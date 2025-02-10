import { FeedbackDelay, FMSynth, FrequencyShifter, Gain, Reverb, Sequence, Synth } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { FPAttributes } from "../../fingerprint";
import { PlayState, SoundVariableKey, SoundVariableValue } from "../../providers/soundProvider";
import { scale } from "../../util/number";
import BaseSound from "./BaseSound";

class TimezoneSound extends BaseSound {
  private timeZoneArr?: Uint8Array;
  private count = 0;

  private reverb = new Reverb(20);

  private synth1 = new Synth({
    oscillator: {
      type: "custom",
      partials: [2, 1, 2, 2],
    },
    envelope: {
      attack: 0.5,
      decay: 0.7,
      sustain: 0.2,
      release: 1,
    },
    portamento: 0.1,
  });

  private synth2 = new Synth({
    oscillator: {
      type: "custom",
      partials: [1, 2, 1, 1],
    },
    envelope: {
      attack: 0.005,
      decay: 0.3,
      sustain: 0.2,
      release: 1,
    },
    portamento: 0.01,
  });

  private synth3 = new FMSynth({
    detune: 3,
  });

  private feedbackDelay = new FeedbackDelay("8n", 0.5);
  private freqShift = new FrequencyShifter();

  private seq = new Sequence(
    (time, note) => {
      if (!this.timeZoneArr) return;
      if (this.count >= this.timeZoneArr.length) this.count = 0;

      const currNum = this.timeZoneArr[this.count];

      const shift1 = scale(currNum, 0, 256, -200, 0);
      const shift2 = scale(currNum, 0, 256, 0, 100);
      const freq = scale(currNum, 0, 256, 400, 2000);

      if (currNum > 30) {
        this.freqShift.frequency.exponentialRampTo(shift1, "4n");
        this.freqShift.frequency.exponentialRampTo(shift2, "4n", "+2n");
      }

      if (currNum < 100) {
        this.synth1.triggerAttackRelease(freq * 0.7, "1m", time);
        this.synth2.triggerAttackRelease(freq * 1.2, "1m", time);
        this.synth3.triggerAttackRelease(note, "1m", time);
      } else if (currNum < 200) {
        this.synth3.triggerAttackRelease(note, "1m", time);
      }

      this.count++;
    },
    ["E4", "F#4", "B4", "C#5", "D5", "F#4", "E4", "C#5", "B4", "F#4", "D5", "C#5"],
    "1m",
  );

  private gain = new Gain(0.2);

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.gain.chain(this.reverb, this.feedbackDelay, this.freqShift, this.envelope);

    this.synth1.connect(this.gain);
    this.synth2.connect(this.gain);
    this.synth3.connect(this.gain);
  }

  updateVariables(name: SoundVariableKey, value: SoundVariableValue): void {
    super.updateVariables(name, value);
    const timeZone = this.musicVariables.get(FPAttributes.timeZone);
    if (!timeZone || typeof timeZone !== "string") return;

    const timeZoneBinaryStr = atob(timeZone.replace("/", ""));
    this.timeZoneArr = new Uint8Array(timeZoneBinaryStr.length);
    for (let i = 0; i < timeZoneBinaryStr.length; i++) {
      this.timeZoneArr[i] = timeZoneBinaryStr.charCodeAt(i);
    }
  }

  async load(): Promise<void> {
    await this.reverb.ready;
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };
}

export default TimezoneSound;
