
import React, { Suspense } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './src/AppNavigator';
import { store, persistor} from './src/store';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
            translucent={true}
          />
          <MenuProvider>
            <Suspense fallback="loading">
              <AppNavigator />
            </Suspense>
          </MenuProvider>  
        </PersistGate>
    </Provider>
  );
};

export default App;
