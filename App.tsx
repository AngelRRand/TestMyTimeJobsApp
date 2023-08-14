import * as React from 'react';
import AppStack from './src/navigation/AppStack';
import { Provider } from 'react-redux';
import store from './src/redux';



export default function App() {
  return (
    <Provider store={store}>
      <AppStack/>
    </Provider>
  );
}
