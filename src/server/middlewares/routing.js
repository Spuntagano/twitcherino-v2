import React from 'react';
import express from 'express';
import createLocation from 'history/lib/createLocation';
import {Router, Route, match, RoutingContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../reducers';
import routes from '../../routes';

function getRootComponent(renderProps) {
  let component = null;

  const store = createStore(reducers);

  component = (
    <Provider store={store}>
      {() => <RoutingContext {...renderProps} />}
    </Provider>
  );

  return {
    component: component,
    initialState: store.getState()
  };
}

export default function(req, res) {
  let location = createLocation(req.url);

  return new Promise( (resolve, reject) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.status(301).redirect(redirectLocation.pathname + redirectLocation.search);
      }else if (error) {
        res.status(500).send(error.message);
      }else if (renderProps == null) {
        res.status(404).send('Not found');
      }

      resolve(getRootComponent(renderProps));
    });
  });
}