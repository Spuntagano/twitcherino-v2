import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Stream from './stream';

class Streams extends React.Component {

	constructor(props) {
	  	super(props);
	}

  	render() {
		const { streams } = this.props;

		return (
			<div className="container-fluid">
				<div className="row">
					{[...streams].map((stream) => {
						return (<Stream key={stream.channel._id} stream={stream} />);
					})}
		  		</div>
	  		</div>
		);
  	}
}

export default Streams;

