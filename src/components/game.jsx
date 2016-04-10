import React from 'react';
import { Link } from 'react-router';
import radium from 'radium';
import ellipsis from 'ellipsis-overflow';

class Game extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
		this.refs.ellipsis.style.overflowY = 'scroll';
		ellipsis(this.refs.ellipsis);
		this.refs.ellipsis.style.overflowY = 'hidden';
	}

  	render() {
		const { game } = this.props;

		const style = {
			imgStyle: {
				width: '100%',
		 		height: 'auto'
		 	}
		};
		
		return (
	  		<div style={{padding: '0 10px'}} className="col s12 m6 l2">
	  			<Link to={'/games/' + game.game.name} className="waves-effect waves-block waves-light">
			  		<div className="card">
			  		  <div className="card-image">
			  		    <img style={style.imgStyle} src={game.game.box.large} alt={game.game.name} width="297" height="415" />
			  		  </div>
			  		  <div style={{padding: '10px'}} className="card-content grey darken-3">
			  		    <div ref="ellipsis" style={{height: '44px', display: 'inline-block'}} className="light-text lighten-2">
			  		    	{game.game.name}
			  		    </div>
			  		  </div>
			  		</div>
		  		</Link>
	  		</div>
		);
  	}
}

export default radium(Game);

