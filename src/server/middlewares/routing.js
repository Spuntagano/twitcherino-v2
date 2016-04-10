import React from 'react';
import express from 'express';
import createLocation from 'history/lib/createLocation';
import {Router, Route, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../reducers';
import routes from '../../routes';
import configureStore from '../../configure-store';
import { StyleRoot } from 'radium';

function getRootComponent(renderProps) {

  const store = configureStore();

  let component = (
    <StyleRoot>
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
    </StyleRoot>
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