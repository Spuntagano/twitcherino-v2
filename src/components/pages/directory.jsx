import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchStreamsIfNeeded, clearStreamList } from '../../actions/streams-actions';
import Streams from '../streams';
import _ from 'underscore';
import CONSTS from '../../utils/consts';

class Directory extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
	  	const { dispatch, streams } = this.props;
	  	dispatch( fetchStreamsIfNeeded(streams.numberStreamsFetched) );
	}

	componentDidUpdate() {
		const { dispatch, streams } = this.props;
		window.onscroll = _.debounce(function(ev) {
		    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - CONSTS.SCROLL_LOAD_OFFSET) {
		        dispatch( fetchStreamsIfNeeded(streams.numberStreamsFetched) );
		    }
		}, CONSTS.DEBONCE_TIMER);
	}

	componentWillUnmount() {
		const { dispatch } = this.props;
		dispatch( clearStreamList() );
	}

	renderStreams() {
		const { streams } = this.props;
		if (!_.isUndefined(streams.streamList)){
			return (<Streams streams={streams.streamList} />);
		}
	}

  	render() {
		return (
			<div>
				{this.renderStreams()}
	  		</div>
		);
  	}
}

export default connect(state => ({ streams: state.streams }))(Directory);

