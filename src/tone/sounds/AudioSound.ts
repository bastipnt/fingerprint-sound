import { Gain, Player, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import sample from "../../assets/samples/creepy-fx-cave-atmo.wav";
import { PlayState } from "../../providers/soundProvider";
import BaseSound from "./BaseSound";

class AudioSound extends BaseSound {
  player = new Player();

  seq = new Sequence(
    (time, pattern: 0 | 1) => {
      if (pattern === 1) this.player.start(time);
    },
    [1],
    "5m",
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

export default AudioSound;
