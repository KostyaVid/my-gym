import { RootStoreContext, rootStore } from "./store/rootStore.store";
import Navigation from "./route/Navigation";

const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <Navigation />
    </RootStoreContext.Provider>
  );
};

export default App;
