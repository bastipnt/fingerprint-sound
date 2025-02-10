import { FPValue } from ".";

const getHash = (signal: ArrayLike<number>): number => {
  let hash = 0;
  for (let i = 0; i < signal.length; ++i) {
    hash += Math.abs(signal[i]);
  }
  return hash;
};

/**
 * @returns audio context data string
 *
 * @see https://github.com/fingerprintjs/fingerprintjs/blob/master/src/sources/audio.ts
 *
 */
export const getAudioContext = async (): Promise<FPValue> => {
  const value: FPValue = { ogValue: "Unknown", ogData: "Unknown" };

  const hashFromIndex = 4500;
  const hashToIndex = 5000;
  const audioContext = new OfflineAudioContext(1, hashToIndex, 44100);

  const oscillator = audioContext.createOscillator();
  oscillator.type = "triangle";
  oscillator.frequency.value = 10000;

  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.value = -50;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;

  oscillator.connect(compressor);
  compressor.connect(audioContext.destination);
  oscillator.start(0);

  const renderingPromise = audioContext.startRendering();

  const audioBuffer = await renderingPromise;
  const audioArr = audioBuffer.getChannelData(0).subarray(hashFromIndex);
  const hash = getHash(audioArr);

  value.ogData = audioArr;
  value.ogValue = hash.toString();

  return value;
};
