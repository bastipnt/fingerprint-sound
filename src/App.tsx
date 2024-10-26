import { useRef, useState } from "react";
import "./App.css";
// import useFingerprint from "./hooks/useFingerprint";
import useTonejs from "./hooks/useTonejs";

function App() {
  const { init, myToneRef, isLoading } = useTonejs();
  // const fingerprint = useFingerprint();

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

    if (fftCanvas.current !== null)
      myTone.addFFTVisualisation(fftCanvas.current);

    if (signalCanvas.current !== null)
      myTone.addSignalisualisation(signalCanvas.current);

    if (isPlaying) {
      myTone.stop();
      setPlaying(false);
    } else {
      myTone.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <div className="main">
        <section className="welcome">
          <h1>Browser Fingerprint Music</h1>
          <button id="start" onClick={handleClickPlay}>
            {isLoading ? "Loading..." : isPlaying ? "Stop" : "Play"}
          </button>
          <canvas ref={fftCanvas}></canvas>
          <canvas ref={signalCanvas}></canvas>
        </section>
      </div>
    </>
  );
}

export default App;
