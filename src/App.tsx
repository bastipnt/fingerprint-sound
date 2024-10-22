import "./App.css";
import useFingerprint from "./hooks/useFingerprint";
import useTonejs from "./hooks/useTonejs";

function App() {
  const myTone = useTonejs();
  const fingerprint = useFingerprint();

  const handleClickPlay = () => {
    myTone.play();
  };

  return (
    <>
      <div className="main">
        <section className="welcome">
          <h1>Browser Fingerprint Music</h1>
          <button onClick={handleClickPlay}>Play</button>
        </section>
      </div>
    </>
  );
}

export default App;
