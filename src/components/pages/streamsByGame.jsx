import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchStreamsByGameIfNeeded, clearStreamList } from '../../actions/streams-actions';
import Streams from '../streams';
import _ from 'underscore';
import CONSTS from '../../utils/consts';

class Directory extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
	  	const { dispatch, streams } = this.props;
	  	const  { gameId } = this.props.params;
	  	dispatch( fetchStreamsByGameIfNeeded(streams.numberStreamsFetched, gameId) );
	}

	componentDidUpdate() {
		const { dispatch, streams } = this.props;
		const  { gameId } = this.props.params;
		window.onscroll = _.debounce(function(ev) {
		    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - CONSTS.SCROLL_LOAD_OFFSET) {
		        dispatch( fetchStreamsByGameIfNeeded(streams.numberStreamsFetched, gameId) );
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

