import React from 'react';
import { Router, Route } from 'react-router';
import reactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import CONSTS from './utils/consts';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes';

const store = createStore(reducers);

reactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
), document.getElementById( CONSTS.APP_DOM_CONTAINER ));
