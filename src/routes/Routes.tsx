import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CommentScreen from '../screens/CommentScreen';

const RootStack = createStackNavigator();

export const Routes: React.FC = () => {
  const {Navigator, Screen} = RootStack;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#023413',
          },
        }}>
        <Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
        <Screen
          name="Comment"
          component={CommentScreen}
          options={{
            headerTintColor: '#fff',
          }}
        />
      </Navigator>
    </SafeAreaView>
  );
};
