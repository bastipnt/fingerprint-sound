import { useState } from "react";
import "./App.css";
// import useFingerprint from "./hooks/useFingerprint";
import useTonejs from "./hooks/useTonejs";

function App() {
  const { init, myToneRef } = useTonejs();
  // const fingerprint = useFingerprint();

  const [isInitialised, setIsInitialised] = useState(false);
  const [isPlaying, setPlaying] = useState(false);

  const handleClickPlay = async () => {
    if (!isInitialised) {
      await init();
      setIsInitialised(true);
    }

    const myTone = myToneRef.current;

    if (!myTone) return;

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
          <button onClick={handleClickPlay}>
            {isPlaying ? "Stop" : "Play"}
          </button>
        </section>
      </div>
    </>
  );
}

export default App;
