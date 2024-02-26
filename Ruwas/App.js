import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackScreen from "./MainStack";
import { Provider } from "react-redux";
import Store from "./Redux/Store";

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <MainStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
