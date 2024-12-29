import Layout from "./Layout";
import StoriesWrapper from "./components/StoriesWrapper";
import Provider from "./providers";

function App() {
  return (
    <Provider>
      <Layout>
        <StoriesWrapper />
      </Layout>
    </Provider>
  );
}

export default App;
