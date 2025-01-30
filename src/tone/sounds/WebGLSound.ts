import { AmplitudeEnvelope, Player, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import sample from "../../assets/samples/creepy-weird-pad-246597.mp3";
import BaseSound from "./BaseSound";

class WebGLSound extends BaseSound {
  player = new Player();

  seq = new Sequence(
    (time, pattern: 0 | 1) => {
      if (pattern === 1) this.player.start(time);
    },
    [1],
    "1m",
  );

  constructor(envelope: AmplitudeEnvelope, scale: string) {
    super(envelope, scale);
  }

  connect = () => {
    this.player.connect(this.effectChain);
  };

  disconnect = () => {
    this.player.disconnect(this.effectChain);
  };

  async loadSamples() {
    await this.player.load(sample);
  }

  play = (time: Time) => {
    this.seq.start(time);
  };

  stop = (time: Time) => {
    this.seq.stop(time);
  };
}

export default WebGLSound;
