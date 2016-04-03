import React from 'react';
import CONSTS from '../utils/consts';

export default class Html extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    let initialState = JSON.stringify(this.props.initialState);

    return (
      <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>{ CONSTS.APP_NAME }</title>
        <script dangerouslySetInnerHTML={{__html: 'window.__INITIAL_STATE__ = ' + initialState}}></script>
      </head>
      <body>
        <div id="react-view" dangerouslySetInnerHTML={{__html: React.renderToString(this.props.component)}}></div>
        <script src="assets/bundle.js"></script>
      </body>
      </html>
    );
  }
}