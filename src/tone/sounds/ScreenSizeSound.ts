import { Gain, Panner3D, Player, Reverb, Sequence } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import hihat from "../../assets/samples/metallic-hyperpop-hat_160bpm.wav";
import { FPAttributes } from "../../fingerprint";
import { FPAttributeName, FPAttributeValue, PlayState } from "../../providers/soundProvider";
import { scale } from "../../util/number";
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
  private _decay: number = 3;

  private player = new Player();

  private reverb = new Reverb({ decay: this.decay, wet: 1 });
  private panner = new Panner3D(0, 0, 0.4);

  private seq = new Sequence(
    (time, pattern: 0 | 1) => {
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

  updateVariables(name: FPAttributeName, value: FPAttributeValue): void {
    super.updateVariables(name, value);
    const screenSize = this.musicVariables.get(FPAttributes.screenSize);
    if (!screenSize || typeof screenSize !== "string") return;

    const width = Number(screenSize.split("x")[0]);
    this.decay = scale(width, 800, 6000, 0, 20);

    const [mouseX, mouseY] = (this.musicVariables.get("mousePosition") as [number, number]) || [
      0, 0,
    ];
    const x = scale(mouseX, 0, window.innerWidth, -1, 1);
    const y = scale(mouseY, 0, window.innerHeight, -1, 1);
    this.panner.set({
      positionX: x,
      positionY: y,
    });
  }

  private get decay() {
    return this._decay;
  }

  private set decay(newDecay: number) {
    if (this._decay === newDecay) return;
    this._decay = newDecay;
    this.reverb.set({ decay: newDecay });
  }
}

export default ScreenSizeSound;
