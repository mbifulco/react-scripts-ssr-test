import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
  browser: responsiveStateReducer,
  router: routerReducer,
});

export default reducers;
