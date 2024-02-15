// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackScreen from './MainStack';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

import { ToastProvider } from 'react-native-toast-notifications';

const App = () => {
  return (
    <ToastProvider>
    <Provider store={Store}>

      <NavigationContainer>
        <MainStackScreen />
      </NavigationContainer>  
    </Provider>
    </ToastProvider>
  );
};

export default App;
