import { AmplitudeEnvelope, Gain, now as toneNow } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { FPAttributeName, FPAttributeValue, PlayState } from "../../providers/soundProvider";

abstract class BaseSound {
  private mainGain: Gain;
  protected envelope: AmplitudeEnvelope;
  protected musicVariables = new Map<FPAttributeName, FPAttributeValue>();

  protected state: PlayState = PlayState.STOPPED;
  private setStateCallback: (newState: PlayState) => void;

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    this.mainGain = mainGain;
    this.setStateCallback = setStateCallback;

    this.envelope = new AmplitudeEnvelope(0.3, undefined, 1, 0.3);
    this.envelope.connect(this.mainGain);
  }

  protected abstract startChild: (time: Time) => void;
  protected abstract stopChild: (time: Time) => void;

  private setState(newState: PlayState) {
    this.state = newState;
    this.setStateCallback(newState);
  }

  start(time: Time) {
    if (this.state !== PlayState.STOPPED) return;
    this.startChild(time);
    this.setState(PlayState.MUTED);
  }

  stop(time: Time) {
    if (this.state === PlayState.STOPPED) return;
    this.mute();
    this.stopChild(time);
    this.setState(PlayState.STOPPED);
  }

  unMute() {
    if (this.state !== PlayState.MUTED) return;
    this.envelope.triggerAttack(toneNow());
    this.setState(PlayState.STARTED);
  }

  mute() {
    if (this.state !== PlayState.STARTED) return;
    this.envelope.triggerRelease(toneNow());
    this.setState(PlayState.MUTED);
  }

  async load() {}

  updateVariables(name: FPAttributeName, value: FPAttributeValue) {
    this.musicVariables.set(name, value);
  }
}

export default BaseSound;
