import * as React from 'react';
import {Animated, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CommentScreen from '../screens/CommentScreen';
import {useEffect} from 'react';
import StoryIdsContext from '../storyIdsContext';
import {FadeInView} from '../components/FadeInView';

const RootStack = createStackNavigator();

export const Routes: React.FC = () => {
  const {Navigator, Screen} = RootStack;

  const [storyIds, setStoryIds] = React.useState<Array<number>>([]);

  // Before app launches we will get the stories ids, which will be stored inside the context
  const getAllBestStoriesIds = () => {
    fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
      .then(response => response.json())
      .then(json => {
        setStoryIds(json);
      });
  };

  useEffect(() => {
    getAllBestStoriesIds();
  }, []);

  return storyIds.length > 0 ? (
    <StoryIdsContext.Provider value={storyIds}>
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
    </StoryIdsContext.Provider>
  ) : (
    <FadeInView>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#023413',
        }}
      />
    </FadeInView>
  );
};
