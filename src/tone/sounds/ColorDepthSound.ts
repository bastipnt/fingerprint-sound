import { Gain, Player, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import kick from "../../assets/samples/kick-rumble.wav";
import { PlayState } from "../../providers/soundProvider";
import BaseSound from "./BaseSound";

class ColorDepthSound extends BaseSound {
  player = new Player();

  seq = new Sequence(
    (time, pattern: 0 | 1) => {
      if (pattern === 1) this.player.start(time);
    },
    [1, 0, 0, 1, 1, 0, 1, 1],
    "8n",
  );

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.player.connect(this.envelope);
  }

  async load() {
    await this.player.load(kick);
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };
}

export default ColorDepthSound;
