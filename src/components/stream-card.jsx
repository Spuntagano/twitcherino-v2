import React from 'react';
import { Link } from 'react-router';
import radium from 'radium';
import ellipsis from '../utils/ellipsis';

class Stream extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
		ellipsis(this.refs.ellipsis);
	}

  	render() {
		const { stream } = this.props;

		const style = {
			imgStyle: {
				width: '100%',
		 		height: 'auto'
		 	}
		};
		
		return (
	  		<div style={{padding: '0 10px'}} className="col s12 m6 l2">
	  			<Link to={"/twitch/" + stream.name}>
			  		<div className="card">
			  		  <div className="card-image waves-effect waves-block waves-light">
			  		    <img style={style.imgStyle} src={stream.preview} alt={stream.name} width="320" height="180" />
			  		  </div>
			  		  <div style={{padding: '10px'}} className="card-content grey darken-3">
			  		    <div ref="ellipsis" style={{height: '44px', display: 'inline-block'}} className="grey-text text-lighten-1">
			  		    	{stream.status}
			  		    </div>
			  		  </div>
			  		</div>
		  		</Link>
	  		</div>
		);
  	}
}

export default radium(Stream);

