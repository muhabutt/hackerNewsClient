import React, {useEffect} from 'react';
import FlatListComponent from '../components/FlatListComponent';
import {FadeInView} from '../components/FadeInView';
import {Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
import {getAllBestStoriesIds} from '../redux/actions';

/**
 * Home Screen
 * @constructor
 */
const HomeScreen: React.FC = () => {
  const data = useSelector((state: RootState) => state.bestStoriesReducer.ids);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBestStoriesIds());
  }, []);

  return data && data.length > 0 ? (
    <FlatListComponent ids={data} />
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

export default HomeScreen;
