import * as React from 'react';
import {ActivityIndicator} from 'react-native';
import {FadeInView} from './FadeInView';

export const Loader: React.FC = () => {
  return (
    <FadeInView
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#023413',
      }}>
      <ActivityIndicator color={'#fff'} size={'large'} />
    </FadeInView>
  );
};
