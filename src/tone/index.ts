import { Synth } from "tone";

class MyTone {
  synth = new Synth().toDestination();

  play() {
    this.synth.triggerAttackRelease("C4", "8n");
  }
}

export default MyTone;
