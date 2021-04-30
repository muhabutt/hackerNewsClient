import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {CommentNavigatorParamsList} from '../types';
import {Loader} from '../components/Loader';
import FlatListComponent from '../components/FlatListComponent';

/**
 * react Navigation route type hinting
 */
interface CommentScreenProps {
  route: RouteProp<CommentNavigatorParamsList, 'Comment'>;
}

/**
 * Function pure component
 * @param route
 * @constructor
 */
const CommentScreen: React.FC<CommentScreenProps> = ({route}) => {
  const {story} = route.params;

  return story ? <FlatListComponent ids={[]} story={story} /> : <Loader />;
};
const propsAreEqual = (
  prevProps: Readonly<React.PropsWithChildren<CommentScreenProps>>,
  nextProps: Readonly<React.PropsWithChildren<CommentScreenProps>>,
) => {
  return prevProps.route.params.story.id === nextProps.route.params.story.id;
};

export default React.memo(CommentScreen, propsAreEqual);
