import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFingerprint from "./hooks/useFingerprint";
import useTonejs from "./hooks/useTonejs";

const Old = () => {
  const { init, myToneRef, isLoading } = useTonejs();
  const { fingerprint, createFingerprint } = useFingerprint();

  const [isInitialised, setIsInitialised] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const fftCanvas = useRef<HTMLCanvasElement>(null);
  const signalCanvas = useRef<HTMLCanvasElement>(null);

  const handleClickPlay = async () => {
    if (!isInitialised) {
      await init();
      setIsInitialised(true);
    }

    const myTone = myToneRef.current;
    if (!myTone) return;

    if (fftCanvas.current !== null) myTone.addFFTVisualisation(fftCanvas.current);
    if (signalCanvas.current !== null) myTone.addSignalisualisation(signalCanvas.current);

    if (isPlaying) {
      myTone.stop();
      setPlaying(false);
    } else {
      myTone.start();
      setPlaying(true);
    }
  };

  const handleClickCreateFingerprint = () => {
    createFingerprint();
  };

  useEffect(() => {
    if (fingerprint) console.log(fingerprint);
  }, [fingerprint]);

  return (
    <>
      <button id="create-fingerprint" onClick={handleClickCreateFingerprint}>
        Create Fingerprint
      </button>
      <button id="start" onClick={handleClickPlay}>
        {isLoading ? "Loading..." : isPlaying ? "Stop" : "Play"}
      </button>
      <canvas ref={fftCanvas}></canvas>
      <canvas ref={signalCanvas}></canvas>
    </>
  );
};

export default Old;
