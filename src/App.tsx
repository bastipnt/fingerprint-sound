import { Route, Switch } from "wouter";
import StoriesWrapper from "./components/StoriesWrapper";
import Fingerprint from "./Fingerprint";
import Layout from "./Layout";
import Provider from "./providers";
import Welcome from "./Welcome";

function App() {
  return (
    <Provider>
      <Layout>
        <Switch>
          <Route path="/">
            <Welcome />
          </Route>

          <Route path="/fp-sound">
            <Fingerprint />
          </Route>

          <Route path="/stories" component={StoriesWrapper} />

          <Route>404: No such page!</Route>
        </Switch>
      </Layout>
    </Provider>
  );
}

export default App;
