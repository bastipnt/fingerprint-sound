import { Gain, Player, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import sample from "../../assets/samples/creepy-weird-pad-246597.mp3";
import { PlayState } from "../../hooks/useTonejs";
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

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.player.connect(this.envelope);
  }

  async load() {
    await this.player.load(sample);
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };
}

export default WebGLSound;
