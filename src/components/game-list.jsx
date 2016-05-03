import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import GameCard from './game-card';
import _ from 'underscore';

class Games extends React.Component {

	constructor(props) {
	  	super(props);
	}

  	render() {
		const { games } = this.props;

		return (
			<div style={{marginTop: '15px'}} className="container-fluid">
				<div className="row">
					{[...games].map((game) => {
						return (<GameCard key={game.id} game={game} />);
					})}
		  		</div>
	  		</div>
		);
  	}
}

export default Games;

