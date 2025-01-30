import { AmplitudeEnvelope, Player, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import snare from "../../assets/samples/phonk-snare_130bpm_C_minor.wav";
import BaseSound from "./BaseSound";

class CanvasSound extends BaseSound {
  snarePlayer = new Player();

  seq = new Sequence(
    (time, pattern: 0 | 1) => {
      if (pattern === 1) this.snarePlayer.start(time);
    },
    [1, 0, 0, 1, 1, 0, 1, 1],
    "8n",
  );

  constructor(envelope: AmplitudeEnvelope, scale: string) {
    super(envelope, scale);
  }

  connect = () => {
    this.snarePlayer.connect(this.effectChain);
  };

  disconnect = () => {
    this.snarePlayer.disconnect(this.effectChain);
  };

  async loadSamples() {
    await this.snarePlayer.load(snare);
  }

  play = (time: Time) => {
    this.seq.start(time);
  };

  stop = (time: Time) => {
    this.seq.stop(time);
  };
}

export default CanvasSound;
