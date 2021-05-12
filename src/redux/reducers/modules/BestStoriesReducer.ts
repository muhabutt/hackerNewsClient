import {GET_BEST_STORIES_IDS} from '../../actions/ActionTypes';
import {BestStoriesAction, BestStoriesState} from '../../../types';

const bestStoriesState: BestStoriesState = {
  ids: [],
};

const BestStoriesReducer = (
  state: BestStoriesState = bestStoriesState,
  action: BestStoriesAction,
): BestStoriesState => {
  switch (action.type) {
    case GET_BEST_STORIES_IDS:
      return {
        ...state,
        ids: action.bestStories.ids,
      };
    default:
      return state;
  }
};

export default BestStoriesReducer;
