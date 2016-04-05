import React from 'react';
import { Router, Route } from 'react-router';
import reactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import CONSTS from './utils/consts';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes';
import configureStore from './configure-store';

const store = configureStore();

reactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
), document.getElementById( CONSTS.APP_DOM_CONTAINER ));
