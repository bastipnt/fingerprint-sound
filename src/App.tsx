import { Route, Switch } from "wouter";
import FingerprintSound from "./FingerprintSound";
import Info from "./Info";
import Layout from "./Layout";
import Provider from "./providers";
import Welcome from "./Welcome";

function App() {
  return (
    <Provider>
      <Layout>
        <Switch>
          <Route path="/" component={Welcome} />
          <Route path="/fp-sound" component={FingerprintSound} />
          <Route path="/info" component={Info} />
          <Route>404: No such page!</Route>
        </Switch>
      </Layout>
    </Provider>
  );
}

export default App;
