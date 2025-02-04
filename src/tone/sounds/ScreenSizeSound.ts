import { Gain, Panner3D, Player, Reverb, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import hihat from "../../assets/samples/metallic-hyperpop-hat_160bpm.wav";
import { FPAttributes } from "../../fingerprint";
import { PlayState } from "../../providers/soundProvider";
import BaseSound from "./BaseSound";

/**
 * Maybe size can influence the delay/reverb of this?
 * Make it sound like a bigger room?
 *
 * Sound: hihat (metallic-hyperpop-hat_160bpm)
 *
 * Inspiration: https://soundcloud.com/area3000/antidote-world-radio-invites-dj-wayang-girl-tool-7-november-2023 (1:57:00)
 *
 * Change reverb size depending on screen size
 *
 */
class ScreenSizeSound extends BaseSound {
  player = new Player();

  reverb = new Reverb({ decay: 3, wet: 1 });
  panner = new Panner3D(0, 0, 0.4);

  seq = new Sequence(
    (time, pattern: 0 | 1) => {
      this.panner.set({
        positionX: Math.random() * 10 - 5,
        positionY: Math.random(),
        positionZ: Math.sin(Math.random()) * 3,
      });
      if (pattern === 1) this.player.start(time);
    },
    [1, 0, 0, 1, 1, 0, 1, 1],
    "8n",
  );

  constructor(mainGain: Gain, setStateCallback: (newState: PlayState) => void) {
    super(mainGain, setStateCallback);
    this.player.chain(this.reverb, this.panner, this.envelope);
  }

  async load() {
    await Promise.all([this.player.load(hihat), this.reverb.ready]);
  }

  startChild = (time: Time) => {
    this.seq.start(time);
  };

  stopChild = (time: Time) => {
    this.seq.stop(time);
  };

  updateVariables(name: FPAttributes, value: string): void {
    super.updateVariables(name, value);
    const screenSize = this.musicVariables.get(FPAttributes.screenSize);
    if (!screenSize) return;

    console.log(screenSize);
  }
}

export default ScreenSizeSound;
