import { useCallback, useRef, useState } from "react";
import { FPAttributes } from "../providers/fingerprintProvider";
import type MyTone from "../tone";

export type PlayState = {
  [value in FPAttributes]?: boolean;
};

const useTonejs = () => {
  const myToneRef = useRef<MyTone>(null);
  const [isInitialised, setIsInitialised] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [globalIsPlaying, setGlobalIsPlaying] = useState(false);
  const [playState, setPlayState] = useState<PlayState>({
    [FPAttributes.audioContext]: false,
    [FPAttributes.canvas2D]: false,
    [FPAttributes.canvasWebGL]: false,
    [FPAttributes.colorDepth]: false,
    [FPAttributes.screenSize]: false,
    [FPAttributes.timeZone]: false,
  });

  const init = async () => {
    const MyTone = (await import("../tone")).default;
    await MyTone.init();
    myToneRef.current = new MyTone(setIsLoading);
  };

  const toggleGlobalPlay = useCallback(async () => {
    if (!isInitialised) {
      await init();
      setIsInitialised(true);
    }

    const myTone = myToneRef.current;
    if (!myTone) return;

    if (globalIsPlaying) {
      myTone.stop();
      setGlobalIsPlaying(false);
    } else {
      await myTone.start();
      setGlobalIsPlaying(true);
    }
  }, [globalIsPlaying]);

  const toggleAttributePlay = useCallback(
    async (attributeKey: FPAttributes) => {
      const newAttributePlayState = !playState[attributeKey];

      setPlayState({ ...playState, [attributeKey]: newAttributePlayState });

      if (!globalIsPlaying && newAttributePlayState) await toggleGlobalPlay();

      const myTone = myToneRef.current;
      if (!myTone) return;

      if (newAttributePlayState) await myTone.startFPAttribute(attributeKey);
      else myTone.stopFPAttribute(attributeKey);
    },
    [globalIsPlaying, playState],
  );

  return {
    init,
    myToneRef,
    globalIsPlaying,
    playState,
    isLoading,
    toggleGlobalPlay,
    toggleAttributePlay,
  };
};

export default useTonejs;
