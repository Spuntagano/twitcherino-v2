import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchUserIfNeeded } from '../../actions/user-actions';
import { fetchFollowedStreamsIfNeeded, clearStreamList } from '../../actions/streams-actions';
import StreamList from '../stream-list';
import { onScroll, removeOnScroll } from '../../utils/on-scroll';
import _ from 'underscore';

class Follows extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
	  	const { dispatch, user, streams } = this.props;

		dispatch( fetchFollowedStreamsIfNeeded(streams.numberStreamsFetched) );
	}

	componentDidUpdate() {
		const { dispatch, streams } = this.props;
		onScroll( () => {
	    	dispatch( fetchFollowedStreamsIfNeeded(streams.numberStreamsFetched) );
		});
	}

	componentWillUnmount() {
		const { dispatch } = this.props;
		removeOnScroll();
		dispatch( clearStreamList() );
	}

	renderStreams() {
		const { streams, user } = this.props;

		if (!_.isUndefined(streams.streamList)){
			return (<StreamList streams={streams.streamList} />);
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

export default connect(state => ({ streams: state.streams, user: state.user }))(Follows);

