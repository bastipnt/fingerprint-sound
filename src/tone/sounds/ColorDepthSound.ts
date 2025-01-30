import { AmplitudeEnvelope, Player, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import kick from "../../assets/samples/kick-rumble.wav";
import BaseSound from "./BaseSound";

class ColorDepthSound extends BaseSound {
  kickPlayer = new Player();

  seq = new Sequence(
    (time, pattern: 0 | 1) => {
      if (pattern === 1) this.kickPlayer.start(time);
    },
    [1, 0, 0, 1, 1, 0, 1, 1],
    "8n",
  );

  constructor(envelope: AmplitudeEnvelope, scale: string) {
    super(envelope, scale);
  }

  async loadSamples() {
    await this.kickPlayer.load(kick);
  }

  connect = () => {
    this.kickPlayer.connect(this.effectChain);
  };

  disconnect = () => {
    this.kickPlayer.disconnect(this.effectChain);
  };

  play = (time: Time) => {
    this.seq.start(time);
  };

  stop = (time: Time) => {
    this.seq.stop(time);
  };
}

export default ColorDepthSound;
