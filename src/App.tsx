import { useState } from "react";
import Fingerprint, { FPAttributeKeys } from "./Fingerprint";
import useTonejs from "./hooks/useTonejs";
import Layout from "./Layout";
// import StoriesWrapper from "./components/StoriesWrapper";
import Provider from "./providers";

function App() {
  const { init, myToneRef, isLoading } = useTonejs();

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
      myTone.start();
      setPlaying(true);
    }
  };

  const toggleAttributePlay = (
    attributeKey: FPAttributeKeys,
    newState: boolean,
    value: unknown,
  ) => {};

  return (
    <Provider>
      <Layout>
        {/* <StoriesWrapper /> */}
        <Fingerprint
          toggleGlobalPlay={handleClickPlay}
          toggleAttributePlay={toggleAttributePlay}
          globalIsPlaying={isPlaying}
          globalIsLoading={isLoading}
        />
      </Layout>
    </Provider>
  );
}

export default App;
