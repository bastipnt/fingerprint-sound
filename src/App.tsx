import { useState } from "react";
import { Route, Switch } from "wouter";
import StoriesWrapper from "./components/StoriesWrapper";
import Fingerprint, { FPAttributeKeys } from "./Fingerprint";
import useTonejs from "./hooks/useTonejs";
import Layout from "./Layout";
// import StoriesWrapper from "./components/StoriesWrapper";
import Provider from "./providers";
import Welcome from "./Welcome";

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

  const toggleAttributePlay = async (attributeKey: FPAttributeKeys, newState: boolean) => {
    if (!globalIsPlaying && newState) await toggleGlobalPlay();

    const myTone = myToneRef.current;
    if (!myTone) return;

    if (newState) myTone.startFPAttribute(attributeKey);
    else myTone.stopFPAttribute(attributeKey);
  };

  return (
    <Provider>
      <Layout>
        <Switch>
          <Route path="/">
            <Welcome />
          </Route>

          <Route path="/fp-sound">
            <Fingerprint
              toggleGlobalPlay={toggleGlobalPlay}
              toggleAttributePlay={toggleAttributePlay}
              globalIsPlaying={globalIsPlaying}
              globalIsLoading={isLoading}
            />
          </Route>

          <Route path="/stories" component={StoriesWrapper} />

          <Route>404: No such page!</Route>
        </Switch>
      </Layout>
    </Provider>
  );
}

export default App;
