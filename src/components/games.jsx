import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Game from './game';
import _ from 'underscore';

class Games extends React.Component {

	constructor(props) {
	  	super(props);
	}

  	render() {
		const { games } = this.props;

		return (
			<div className="container-fluid">
				<div className="row">
					{[...games].map((game) => {
						return (<Game key={game.game._id} game={game} />);
					})}
		  		</div>
	  		</div>
		);
  	}
}

export default Games;

