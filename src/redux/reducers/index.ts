/**
 * root reducer which keeps all the reducers states.
 */
import {combineReducers} from 'redux';
import bestStoriesReducer from './modules/BestStoriesReducer';

const rootReducer = combineReducers({
  bestStoriesReducer: bestStoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
