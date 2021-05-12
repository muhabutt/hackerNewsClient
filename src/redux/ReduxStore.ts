import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

/* all middleware object */
const middlewares = [thunk];

//createStore to keep our reducers state and action creators.
const reduxStore = createStore(rootReducer, applyMiddleware(...middlewares));

export {reduxStore};
