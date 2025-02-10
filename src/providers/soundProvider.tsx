import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FPAttributes } from "../fingerprint";
import MyTone from "../tone";
import { FingerprintContext } from "./fingerprintProvider";
import { KeyboardContext } from "./keyboardProvider";

export enum PlayState {
  STARTED,
  STOPPED,
  MUTED,
}

export type SoundPlayStates = {
  [value in FPAttributes]?: PlayState;
};

export type SoundVariableKey = FPAttributes | "mousePosition";
export type SoundVariableValue = string | Float32Array | [number, number];

const initialPlayStates: SoundPlayStates = {
  [FPAttributes.audioContext]: PlayState.STOPPED,
  [FPAttributes.canvas2D]: PlayState.STOPPED,
  [FPAttributes.canvasWebGL]: PlayState.STOPPED,
  [FPAttributes.colorDepth]: PlayState.STOPPED,
  [FPAttributes.screenSize]: PlayState.STOPPED,
  [FPAttributes.timeZone]: PlayState.STOPPED,
};

export const SoundContext = createContext<{
  globalPlayState: PlayState;
  SoundPlayStatess: SoundPlayStates;
  isLoading: boolean;
  toggleGlobalPlay: () => Promise<void>;
  toggleAttributePlay: (soundName: FPAttributes) => Promise<void>;
}>({
  globalPlayState: PlayState.STOPPED,
  SoundPlayStatess: initialPlayStates,
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
  const [SoundPlayStatess, setSoundPlayStatess] = useState<SoundPlayStates>(initialPlayStates);

  const { attributes } = useContext(FingerprintContext);
  const { mousePosition } = useContext(KeyboardContext);

  const setSoundPlayStatesCallback = (soundName: FPAttributes, newPlayState: PlayState) => {
    setSoundPlayStatess((oldSoundPlayStatess) => {
      const oldPlayState = oldSoundPlayStatess[soundName];
      if (newPlayState === oldPlayState) return oldSoundPlayStatess;

      return { ...oldSoundPlayStatess, [soundName]: newPlayState };
    });
  };

  const init = async () => {
    const MyTone = (await import("../tone")).default;
    await MyTone.init();
    myToneRef.current = new MyTone(setIsLoading, setGlobalPlayState, setSoundPlayStatesCallback);
    setIsInitialised(true);
  };

  const updateVariables = useCallback(() => {
    const myTone = myToneRef.current;
    if (!myTone) return;

    for (const [name, value] of attributes) {
      const newValue = value.updatedValue || value.ogData;
      myTone.updateVariables(name, newValue);
    }
  }, [attributes]);

  const toggleGlobalPlay = useCallback(async () => {
    if (!isInitialised) {
      await init();
      updateVariables();
    }

    const myTone = myToneRef.current;
    if (!myTone) return;

    if (globalPlayState === PlayState.STARTED) myTone.mute();
    else if (globalPlayState === PlayState.STOPPED) await myTone.start();
    else if (globalPlayState === PlayState.MUTED) await myTone.unMute();
  }, [globalPlayState, updateVariables]);

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

      if (SoundPlayStatess[soundName] === PlayState.MUTED) myTone.unMuteSound(soundName);
      else if (SoundPlayStatess[soundName] === PlayState.STARTED) myTone.muteSound(soundName);
    },
    [globalPlayState, SoundPlayStatess, toggleGlobalPlay],
  );

  useEffect(() => {
    myToneRef.current?.updateVariables("mousePosition", mousePosition);
  }, [mousePosition]);

  useEffect(() => {
    updateVariables();
  }, [attributes]);

  return (
    <SoundContext.Provider
      value={{
        globalPlayState,
        SoundPlayStatess,
        isLoading,
        toggleAttributePlay,
        toggleGlobalPlay,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export default SoundProvider;
