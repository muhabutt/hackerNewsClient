import React from 'react';
import StoryIdsContext from '../storyIdsContext';
import FlatListComponent from '../components/FlatListComponent';

/**
 * Home Screen
 * @constructor
 */
const HomeScreen: React.FC = () => {
  return (
    <StoryIdsContext.Consumer>
      {data => {
        return <FlatListComponent ids={data} />;
      }}
    </StoryIdsContext.Consumer>
  );
};

export default HomeScreen;
