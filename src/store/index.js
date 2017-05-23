import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { responsiveStoreEnhancer } from 'redux-responsive';
import reducers from './reducers';

export default function configureStore(history) {
  const logger = createLogger({

  });

  const initState = {
  };

  const middlewares = [routerMiddleware(history), thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger); // DEV middlewares
  }

  const store = createStore(reducers, initState, compose(
    applyMiddleware(...middlewares),
    autoRehydrate(),
    responsiveStoreEnhancer,
  ));

  try {
    persistStore(store, { blacklist: ['router'] }, () => {});
  } catch (e) {
    // TODO: handle this error
  }

  return store;
}
