import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchGamesIfNeeded, clearGameList } from '../../actions/games-actions';
import Games from '../games';
import _ from 'underscore';
import CONSTS from '../../utils/consts';

class GamesDirectory extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
	  	const { dispatch, games } = this.props;
	  	dispatch( fetchGamesIfNeeded(games.numberGamesFetched) );
	}

	componentDidUpdate() {
		const { dispatch, games } = this.props;
		window.onscroll = _.debounce(function(ev) {
		    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - CONSTS.SCROLL_LOAD_OFFSET) {
		        dispatch( fetchGamesIfNeeded(games.numberGamesFetched) );
		    }
		}, CONSTS.DEBONCE_TIMER);
	}

	componentWillUnmount() {
		const { dispatch } = this.props;
		dispatch( clearGameList() );
	}

	renderGames() {
		const { games } = this.props;
		if (!_.isUndefined(games.gameList)){
			return (<Games games={games.gameList} />);
		}
	}

  	render() {
		return (
			<div>
				{this.renderGames()}
	  		</div>
		);
  	}
}

export default connect(state => ({ games: state.games }))(GamesDirectory);

