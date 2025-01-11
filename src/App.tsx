import { useState } from "react";
import Fingerprint, { FPAttributeKeys, FPValue } from "./Fingerprint";
import useTonejs from "./hooks/useTonejs";
import Layout from "./Layout";
// import StoriesWrapper from "./components/StoriesWrapper";
import Provider from "./providers";

function App() {
  const { init, myToneRef, isLoading } = useTonejs();

  const [isInitialised, setIsInitialised] = useState(false);
  const [globalIsPlaying, setGlobalIsPlaying] = useState(false);

  const toggleGlobalPlay = async () => {
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
      myTone.start();
      setGlobalIsPlaying(true);
    }
  };

  const toggleAttributePlay = async (
    attributeKey: FPAttributeKeys,
    newState: boolean,
    value: FPValue,
  ) => {
    if (!globalIsPlaying && newState) await toggleGlobalPlay();

    const myTone = myToneRef.current;
    if (!myTone) return;

    if (newState) myTone.startFPAttribute(attributeKey, value);
    else myTone.stopFPAttribute(attributeKey);
  };

  return (
    <Provider>
      <Layout>
        {/* <StoriesWrapper /> */}
        <Fingerprint
          toggleGlobalPlay={toggleGlobalPlay}
          toggleAttributePlay={toggleAttributePlay}
          globalIsPlaying={globalIsPlaying}
          globalIsLoading={isLoading}
        />
      </Layout>
    </Provider>
  );
}

export default App;
