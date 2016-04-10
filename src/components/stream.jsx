import React from 'react';
import { Link } from 'react-router';
import radium from 'radium';
import ellipsis from 'ellipsis-overflow';

class Stream extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
		this.refs.ellipsis.style.overflowY = 'scroll';
		ellipsis(this.refs.ellipsis);
		this.refs.ellipsis.style.overflowY = 'hidden';
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
		  		<div className="card">
		  		  <div className="card-image waves-effect waves-block waves-light">
		  		    <img style={style.imgStyle} src={stream.preview.medium} alt={stream.channel.display_name} width="320" height="180" />
		  		  </div>
		  		  <div style={{padding: '10px'}} className="card-content grey darken-3">
		  		    <div ref="ellipsis" style={{height: '44px', display: 'inline-block'}} className="light-text lighten-2">
		  		    	{stream.channel.status}
		  		    </div>
		  		  </div>
		  		</div>
	  		</div>
		);
  	}
}

export default radium(Stream);

