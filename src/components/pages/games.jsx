import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchGamesIfNeeded, clearGameList } from '../../actions/games-actions';
import GameList from '../game-list';
import _ from 'underscore';
import { onScroll, removeOnScroll } from '../../utils/on-scroll';

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
		onScroll( () => {
	        dispatch( fetchGamesIfNeeded(games.numberGamesFetched) );
		});
	}

	componentWillUnmount() {
		const { dispatch } = this.props;
		removeOnScroll();
		dispatch( clearGameList() );
	}

	renderGames() {
		const { games } = this.props;
		if (!_.isUndefined(games.gameList)){
			return (<GameList games={games.gameList} />);
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

