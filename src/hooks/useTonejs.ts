import { useCallback, useRef, useState } from "react";
import { FPAttributes } from "../fingerprint";
import type MyTone from "../tone";

export enum MVariables {
  SCREEN_SIZE,
}

export enum PlayState {
  STARTED,
  STOPPED,
  MUTED,
}

export type SoundPlayState = {
  [value in FPAttributes]?: PlayState;
};

const useTonejs = () => {
  const myToneRef = useRef<MyTone>(null);
  const [isInitialised, setIsInitialised] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [globalPlayState, setGlobalPlayState] = useState<PlayState>(PlayState.STOPPED);

  const [soundPlayStates, setSoundPlayStates] = useState<SoundPlayState>({
    [FPAttributes.audioContext]: PlayState.STOPPED,
    [FPAttributes.canvas2D]: PlayState.STOPPED,
    [FPAttributes.canvasWebGL]: PlayState.STOPPED,
    [FPAttributes.colorDepth]: PlayState.STOPPED,
    [FPAttributes.screenSize]: PlayState.STOPPED,
    [FPAttributes.timeZone]: PlayState.STOPPED,
  });

  const setSoundPlayStateCallback = (soundName: FPAttributes, newPlayState: PlayState) => {
    setSoundPlayStates((oldSoundPlayStates) => {
      const oldPlayState = oldSoundPlayStates[soundName];
      if (newPlayState === oldPlayState) return oldSoundPlayStates;

      return { ...oldSoundPlayStates, [soundName]: newPlayState };
    });
  };

  const init = async () => {
    const MyTone = (await import("../tone")).default;
    await MyTone.init();
    myToneRef.current = new MyTone(setIsLoading, setGlobalPlayState, setSoundPlayStateCallback);
    setIsInitialised(true);
  };

  const toggleGlobalPlay = useCallback(async () => {
    if (!isInitialised) await init();

    const myTone = myToneRef.current;
    if (!myTone) return;

    if (globalPlayState === PlayState.STARTED) myTone.mute();
    else if (globalPlayState === PlayState.STOPPED) await myTone.start();
    else if (globalPlayState === PlayState.MUTED) await myTone.unMute();
  }, [globalPlayState]);

  const toggleAttributeMute = useCallback(
    async (soundName: FPAttributes) => {
      if (globalPlayState === PlayState.STOPPED) {
        await toggleGlobalPlay();

        const myTone = myToneRef.current;
        if (!myTone) return;
        myTone.unMuteSound(soundName);

        return;
      }

      const myTone = myToneRef.current;
      if (!myTone) return;

      if (soundPlayStates[soundName] === PlayState.MUTED) myTone.unMuteSound(soundName);
      else if (soundPlayStates[soundName] === PlayState.STARTED) myTone.muteSound(soundName);
    },
    [globalPlayState, soundPlayStates],
  );

  return {
    init,
    myToneRef,
    globalPlayState,
    soundPlayStates,
    isLoading,
    toggleGlobalPlay,
    toggleAttributeMute,
  };
};

export default useTonejs;
