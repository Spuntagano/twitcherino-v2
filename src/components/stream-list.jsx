import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import StreamCard from './stream-card';
import _ from 'underscore';

class Streams extends React.Component {

	constructor(props) {
	  	super(props);
	}

  	render() {
		const { streams } = this.props;

		return (
			<div style={{marginTop: '15px'}} className="container-fluid">
				<div className="row">
					{[...streams].map((stream) => {
						return (<StreamCard key={stream.id} stream={stream} />);
					})}
		  		</div>
	  		</div>
		);
  	}
}

export default Streams;

