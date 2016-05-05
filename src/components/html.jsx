import React from 'react';
import reactDOMServer from 'react-dom/server';
import CONSTS from '../utils/consts';

export default class Html extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const initialState = JSON.stringify(this.props.initialState);

    return (
      <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>{ CONSTS.APP_NAME }</title>
        <script dangerouslySetInnerHTML={{__html: 'window.__INITIAL_STATE__ = ' + initialState}}></script>
        <link rel="stylesheet" type="text/css" href="/assets/style.css" />
      </head>
      <body className="grey darken-4 grey-text text-lighten-2">
        <div id="react-view" dangerouslySetInnerHTML={{__html: reactDOMServer.renderToString(this.props.component)}}></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>
        <script src="/assets/bundle.js"></script>
      </body>
      </html>
    );
  }
}