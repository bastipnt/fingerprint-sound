import { Gain, Player, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import hihat from "../../assets/samples/metallic-hyperpop-hat_160bpm.wav";
import { MVariables, PlayState } from "../../hooks/useTonejs";
import BaseSound from "./BaseSound";

/**
 * Maybe size can influence the delay/reverb of this?
 * Make it sound like a bigger room?
 *
 * Sound: hihat (metallic-hyperpop-hat_160bpm)
 *
 * Inspiration: https://soundcloud.com/area3000/antidote-world-radio-invites-dj-wayang-girl-tool-7-november-2023 (1:57:00)
 *
 */
class ScreenSizeSound extends BaseSound {
  player = new Player();

  seq = new Sequence(
    (time, pattern: 0 | 1) => {
      if (pattern === 1) this.player.start(time);
    },
    [1, 0, 0, 1, 1, 0, 1, 1],
    "8n",
  );

  // reverb = new Reverb(1000);

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.player.connect(this.envelope);
  }

  async load() {
    await this.player.load(hihat);
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };

  updateVariables(name: MVariables, value: string): void {
    super.updateVariables(name, value);
  }
}

export default ScreenSizeSound;
