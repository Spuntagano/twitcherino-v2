import React from 'react';
import { Link } from 'react-router';
import EllipsisText  from 'react-ellipsis-text';

class Stream extends React.Component {

	constructor(props) {
	  	super(props);
	}

  	render() {
		const { stream } = this.props;

		const imgStyle = {
			width: '100%',
		 	height: 'auto'
		};

		const h3Style = {
			height: '50px',
			overflow: 'hidden',
			fontSize: '1rem',
			margin: '0.46rem 0 1.168rem 0'
		};

		return (
	  		<div style={{padding: '0 10px'}} className="col-md-2">
		  		<div className="card">
		  		  <div className="card-image waves-effect waves-block waves-light">
		  		    <img src={stream.preview.medium} alt={stream.channel.display_name} width="320" height="180" />
		  		  </div>
		  		  <div style={{padding: '10px'}} className="card-content grey darken-3">
		  		    <div style={{minHeight: '44px'}} className="light-text lighten-2">
		  		    	<EllipsisText text={stream.channel.status} length={'60'} />
		  		    </div>
		  		  </div>
		  		</div>
	  		</div>
		);
  	}
}

export default Stream;

