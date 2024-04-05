import React from "react";
import { View, Text } from "react-native";
import MainNavigations from "./src/navigations/MainNavigations";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigations />
      <Toast />
    </Provider>
  );
};

export default App;
