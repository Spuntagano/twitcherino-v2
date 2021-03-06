import React from 'react';
import { Link } from 'react-router';
import radium from 'radium';
import ellipsis from '../utils/ellipsis';

class Game extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
		ellipsis(this.refs.ellipsis);
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
	  			<Link to={'/games/' + game.name} className="waves-effect waves-block waves-light">
			  		<div className="card">
			  		  <div className="card-image">
			  		    <img style={style.imgStyle} src={game.box} alt={game.name} width="297" height="415" />
			  		  </div>
			  		  <div style={{padding: '10px'}} className="card-content grey darken-3">
			  		    <div ref="ellipsis" style={{height: '44px', display: 'inline-block'}} className="grey-text text-lighten-1">
			  		    	{game.name}
			  		    </div>
			  		  </div>
			  		</div>
		  		</Link>
	  		</div>
		);
  	}
}

export default radium(Game);

