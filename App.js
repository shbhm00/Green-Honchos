import * as React from 'react';
import {View} from 'react-native';
import Router from './src/router';
// import { Provider as StoreProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor, store } from './src/store';
import HomeScreen from './src/homeScreen';
// import { Provider as PaperProvider, Provider } from 'react-native-paper';
const App = () => {
  return (
    // <StoreProvider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <Provider>
    //       <Router />
    //     </Provider>
    //   </PersistGate>
    // </StoreProvider>
    <View style={{flex: 1}}>
      <HomeScreen />
    </View>
  );
};

export default App;
