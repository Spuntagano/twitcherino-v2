import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class App extends React.Component {

  render() {
    const { } = this.props;

    return (
      <div>
        <h1>Twitcherino!!!!!!!!!!!</h1>
      </div>
    );
  }
}

export default connect(state => ({  }))(App);

