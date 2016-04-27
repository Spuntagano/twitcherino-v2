import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

	constructor(props) {
	  	super(props);
	}

  	render() {
		return (
			<nav className="green" style={{marginBottom: '15px'}}>
			  <div className="nav-wrapper">
			    <Link to="/" style={{padding: '0 10px'}} className="brand-logo waves-effect waves-block waves-light">Twitcherino</Link>
			    <ul className="right hide-on-med-and-down">
			    	<li><Link to="/streams" className="waves-effect waves-block waves-light">Streams</Link></li>
			    	<li><Link to="/games" className="waves-effect waves-block waves-light">Games</Link></li>
			    	<li><Link to="/follows" className="waves-effect waves-block waves-light">Follows</Link></li>
			    </ul>
			  </div>
			</nav>
		);
  	}
}

export default Header;

