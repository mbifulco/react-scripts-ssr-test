import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import configureStore from './store';


const history = createHistory();

const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
