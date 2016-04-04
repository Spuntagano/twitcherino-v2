import React from 'react';
import reactDOMServer from 'react-dom/server';
import express from 'express';
import webpack from 'webpack';
import routing from './middlewares/routing';
import Html from '../components/html';
import webpackConfig from '../../webpack.config.babel';
import webpackDevServer from 'webpack-dev-server';
import CONSTS from '../utils/consts';
import proxy from 'proxy-middleware';
import url from 'url';

const compiler = webpack(webpackConfig);
const app = express();
const env = process.env.NODE_ENV;

if (env === 'development'){
    const server = new webpackDevServer(compiler, {
        contentBase: __dirname,
        hot: true,
        quiet: false,
        noInfo: false,
        publicPath: "/assets/",
        stats: { colors: true }
    });
    server.listen(CONSTS.DEV_SERVER_PORT, "localhost", function() {});
    console.log('Dev server listening on ', CONSTS.DEV_SERVER_PORT);

    app.use('/assets', proxy(url.parse('http://localhost:'+ CONSTS.DEV_SERVER_PORT +'/assets')));
}

app.use('/assets', express.static(__dirname + '/../../dist/public'));

app.use((req, res) => {
  routing(req, res)
  .then((routingReturn) => {
      res.send('<!DOCTYPE html>\n' + reactDOMServer.renderToString(<Html component={routingReturn.component} initialState={routingReturn.initialState} />));
  });
});

export default app;