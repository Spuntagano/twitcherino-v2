import React from 'react';
import express from 'express';
import webpack from 'webpack';
import routing from './middlewares/routing';
import Html from '../components/html';
import webpackConfig from '../../webpack.config';
import webpackDevServer from 'webpack-dev-server';

const DEV_SERVER_PORT = 3001;
const compiler = webpack(webpackConfig);
const app = express();
const env = process.env.NODE_ENV;

import proxy from 'proxy-middleware';
import url from 'url';

if (env === 'development'){
    const server = new webpackDevServer(compiler, {
        contentBase: __dirname,
        hot: true,
        quiet: false,
        noInfo: false,
        publicPath: "/assets/",
        stats: { colors: true }
    });
    server.listen(DEV_SERVER_PORT, "localhost", function() {});

    app.use('/assets', proxy(url.parse('http://localhost:'+ DEV_SERVER_PORT +'/assets')));
}

app.use('/assets', express.static(__dirname + '/../../dist/public'));

app.use((req, res) => {
  routing(req, res)
  .then((routingReturn) => {
      res.send('<!DOCTYPE html>\n' + React.renderToString(<Html component={routingReturn.component} initialState={routingReturn.initialState} />));
  });
});

export default app;