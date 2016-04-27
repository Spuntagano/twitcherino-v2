import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchStreamsIfNeeded, clearStreamList } from '../../actions/streams-actions';
import StreamList from '../stream-list';
import { onScroll, removeOnScroll } from '../../utils/on-scroll';
import _ from 'underscore';

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
		onScroll( () => {
	        dispatch( fetchStreamsIfNeeded(streams.numberStreamsFetched) );
		});
	}

	componentWillUnmount() {
		const { dispatch } = this.props;
		removeOnScroll();
		dispatch( clearStreamList() );
	}

	renderStreams() {
		const { streams } = this.props;
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

export default connect(state => ({ streams: state.streams }))(Directory);

