import {GET_BEST_STORIES_IDS} from './ActionTypes';
import {BestStoriesAction, BestStoriesDispatchType} from '../../types';

export const getAllBestStoriesIds = () => {
  return (dispatch: BestStoriesDispatchType) => {
    let data: BestStoriesAction = {
      type: GET_BEST_STORIES_IDS,
      bestStories: {
        ids: [],
      },
    };

    fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
      .then(response => response.json())
      .then(json => {
        data.bestStories.ids = json;
        dispatch(data);
      });
  };
};
