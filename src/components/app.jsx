import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { showStream } from '../actions/app-actions';

class App extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
	  const { dispatch } = this.props;
	  dispatch( showStream() );
	}

  	render() {
		const { app } = this.props;

		return (
			<div>
				<h1>Twitcherino</h1>
				{app.streamId}
	  		</div>
		);
  	}
}

export default connect(state => ({ app: state.app }))(App);

