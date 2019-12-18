/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
// Packages
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
// Components
import AppNavigation from "./src/AppNavigation";
import configureStore from "./src/redux/store";
const { store, persistor } = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
