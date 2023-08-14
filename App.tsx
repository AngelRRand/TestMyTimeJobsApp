import * as React from 'react';
import AppStack from './src/navigation/AppStack';
import { Provider } from 'react-redux';
import store from './src/redux';
import { NativeBaseProvider } from 'native-base';



export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <AppStack />
      </Provider>
    </NativeBaseProvider>
  );
}
