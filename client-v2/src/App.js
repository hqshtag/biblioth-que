import React from "react";
import { Provider } from "react-redux";
import store from "./Store";
import AppRouter from "./AppRouter";

import "./components/styles/styles.scss";

function App() {
  // console.log(store.getState());
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
