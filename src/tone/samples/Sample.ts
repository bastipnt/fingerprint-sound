import { Player } from "tone";

class Sample {
  private url: string;
  player: Player;
  name: string;

  constructor(url: string, name: string) {
    this.player = new Player();
    this.name = name;
    this.url = url;
  }

  async init() {
    await this.player.load(this.url);
  }
}

export default Sample;
