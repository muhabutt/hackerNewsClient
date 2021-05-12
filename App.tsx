import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from './src/routes/Routes';
import {Provider} from 'react-redux';
import {reduxStore} from './src/redux/ReduxStore';
const App = () => {
  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
