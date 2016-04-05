import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchStreamsIfNeeded } from '../actions/streams-actions';

class App extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
	  const { dispatch } = this.props;
	  dispatch( fetchStreamsIfNeeded() );
	}

  	render() {
		const { streams } = this.props;
		console.log(streams);

		return (
			<div>
				<h1>Twitcherino</h1>
				{streams.streamId}
	  		</div>
		);
  	}
}

export default connect(state => ({ streams: state.streams }))(App);

