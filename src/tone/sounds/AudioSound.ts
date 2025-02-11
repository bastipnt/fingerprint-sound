import { AutoFilter, AutoPanner, FrequencyShifter, Gain, getContext, GrainPlayer } from "tone";
import { FPAttributes } from "../../fingerprint";
import { PlayState, SoundVariableKey, SoundVariableValue } from "../../providers/soundProvider";
import BaseSound from "./BaseSound";

class AudioSound extends BaseSound {
  private audioBuffer?: AudioBuffer;
  private _audioData?: Float32Array;

  private player?: GrainPlayer;

  private freqShift = new FrequencyShifter(-8000);
  private autoPan = new AutoPanner("4n").start();
  private autoFilter = new AutoFilter("1n").start();
  private gain = new Gain(4);

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.freqShift.chain(this.autoPan, this.autoFilter, this.gain, this.envelope);
    this.autoFilter.set({ wet: 0.7 });
  }

  updateVariables(name: SoundVariableKey, value: SoundVariableValue): void {
    super.updateVariables(name, value);
    const audioData = this.musicVariables.get(FPAttributes.AUDIO_CONTEXT) as Float32Array;
    if (!audioData || typeof audioData !== "object") return;

    this.setAudioBuffer(audioData);
  }

  startChild = () => {};

  stopChild = () => {};

  setAudioBuffer(newData: Float32Array) {
    if (newData === this._audioData) return;
    this._audioData = newData;

    const ctx = getContext();

    const buffer = ctx.createBuffer(1, 4500, ctx.sampleRate);
    buffer.copyToChannel(newData, 0, 0);

    this.audioBuffer = buffer;

    this.player = new GrainPlayer(this.audioBuffer);
    this.player.connect(this.freqShift);
    this.player.set({
      grainSize: 0.001,
      loop: true,
      playbackRate: 0.001,
      overlap: 0.1,
    });
    this.player.start();
  }
}

export default AudioSound;
