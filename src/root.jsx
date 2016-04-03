import React from 'react';
import { Router, Route } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import CONSTS from './utils/consts';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes';

const store = createStore(reducers);

React.render((
  <Provider store={store}>
    {() => <Router history={createHistory()}>{routes}</Router>}
  </Provider>
), document.getElementById( CONSTS.APP_DOM_CONTAINER ));
