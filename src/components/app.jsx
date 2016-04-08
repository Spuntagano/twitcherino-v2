import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchStreamsIfNeeded } from '../actions/streams-actions';
import Streams from './streams';

if (process.env.BROWSER) {
	require('materialize-css/dist/css/materialize.min.css');
	require('bootstrap-grid/grid.min.css');
}

class App extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
	  const { dispatch } = this.props;
	  dispatch( fetchStreamsIfNeeded() );
	}

	renderStreams() {
		const { streams } = this.props;
		if (streams.streams){
			return (<Streams streams={streams.streams} />);
		}
	}

  	render() {
		return (
			<div>
				<nav className="green" style={{marginBottom: '15px'}}>
				  <div className="nav-wrapper">
				    <a style={{padding: '0 10px'}} href="#" className="brand-logo">Twitcherino</a>
				    <ul className="right hide-on-med-and-down">
				      <li><a href="sass.html">Sass</a></li>
				      <li><a href="badges.html">Components</a></li>
				      <li><a href="collapsible.html">JavaScript</a></li>
				    </ul>
				  </div>
				</nav>
				{this.renderStreams()}
	  		</div>
		);
  	}
}

export default connect(state => ({ streams: state.streams }))(App);

