import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { FPAttributes } from "../fingerprint";
import MyTone from "../tone";
import { FingerprintContext } from "./fingerprintProvider";

export enum PlayState {
  STARTED,
  STOPPED,
  MUTED,
}

export type SoundPlayState = {
  [value in FPAttributes]?: PlayState;
};

export const SoundContext = createContext<{
  globalPlayState: PlayState;
  soundPlayStates: SoundPlayState;
  isLoading: boolean;
  toggleGlobalPlay: () => Promise<void>;
  toggleAttributePlay: (soundName: FPAttributes) => Promise<void>;
}>({
  globalPlayState: PlayState.STOPPED,
  soundPlayStates: {
    [FPAttributes.audioContext]: PlayState.STOPPED,
    [FPAttributes.canvas2D]: PlayState.STOPPED,
    [FPAttributes.canvasWebGL]: PlayState.STOPPED,
    [FPAttributes.colorDepth]: PlayState.STOPPED,
    [FPAttributes.screenSize]: PlayState.STOPPED,
    [FPAttributes.timeZone]: PlayState.STOPPED,
  },
  isLoading: false,
  toggleGlobalPlay: async () => {},
  toggleAttributePlay: async () => {},
});

type Props = {
  children: ReactNode;
};

const SoundProvider: React.FC<Props> = ({ children }) => {
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

  const { attributes } = useContext(FingerprintContext);

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

  const updateAttributes = useCallback(() => {
    const myTone = myToneRef.current;
    if (!myTone) return;

    for (const [name, value] of attributes) {
      myTone.updateVariables(name, value);
    }
  }, [attributes]);

  const toggleGlobalPlay = useCallback(async () => {
    if (!isInitialised) {
      await init();
      updateAttributes();
    }

    const myTone = myToneRef.current;
    if (!myTone) return;

    if (globalPlayState === PlayState.STARTED) myTone.mute();
    else if (globalPlayState === PlayState.STOPPED) await myTone.start();
    else if (globalPlayState === PlayState.MUTED) await myTone.unMute();
  }, [globalPlayState, updateAttributes]);

  const toggleAttributePlay = useCallback(
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
    [globalPlayState, soundPlayStates, updateAttributes],
  );

  return (
    <SoundContext.Provider
      value={{ globalPlayState, soundPlayStates, isLoading, toggleAttributePlay, toggleGlobalPlay }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export default SoundProvider;
