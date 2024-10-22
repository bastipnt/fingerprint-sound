import { Channel } from "tone";

class MyMixer {
  channel1: Channel;
  channel2: Channel;
  channel3: Channel;

  constructor() {
    this.channel1 = new Channel().toDestination();
    this.channel2 = new Channel().toDestination();
    this.channel3 = new Channel().toDestination();
  }
}

export default MyMixer;
