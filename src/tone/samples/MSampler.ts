import { Sampler } from "tone";
import { Note } from "tone/build/esm/core/type/NoteUnits";

type SamplesMap = Array<{ key: Note; url: string }>;

class MSampler {
  name: string;
  samples: SamplesMap;
  sampler: Sampler;

  constructor(samples: SamplesMap, name: string) {
    this.name = name;
    this.samples = samples;
    this.sampler = new Sampler();
  }

  async init() {
    await Promise.all(
      this.samples.map(({ key, url }) => this.addSample(key, url))
    );
  }

  private addSample = (key: Note, url: string) =>
    new Promise<void>((resolve) => {
      this.sampler.add(key, url, resolve);
    });
}

export default MSampler;
