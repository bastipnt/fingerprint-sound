import Fingerprint from "./Fingerprint";
import Layout from "./Layout";
import StoriesWrapper from "./components/StoriesWrapper";
import Provider from "./providers";

function App() {
  return (
    <Provider>
      <Layout>
        {/* <StoriesWrapper /> */}
        <Fingerprint />
      </Layout>
    </Provider>
  );
}

export default App;
