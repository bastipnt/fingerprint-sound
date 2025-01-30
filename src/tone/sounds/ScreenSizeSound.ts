import { AmplitudeEnvelope, Player, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import hihat from "../../assets/samples/metallic-hyperpop-hat_160bpm.wav";
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
  hihatPlayer = new Player();

  seq = new Sequence(
    (time, pattern: 0 | 1) => {
      if (pattern === 1) this.hihatPlayer.start(time);
    },
    [1, 0, 0, 1, 1, 0, 1, 1],
    "8n",
  );

  constructor(envelope: AmplitudeEnvelope, scale: string) {
    super(envelope, scale);
  }

  async loadSamples() {
    await this.hihatPlayer.load(hihat);
  }

  connect = () => {
    this.hihatPlayer.connect(this.effectChain);
  };

  disconnect = () => {
    this.hihatPlayer.disconnect(this.effectChain);
  };

  play = (time: Time) => {
    this.seq.start(time);
  };

  stop = (time: Time) => {
    this.seq.stop(time);
  };
}

export default ScreenSizeSound;
