import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchUserIfNeeded } from '../actions/user-actions';

class Header extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch( fetchUserIfNeeded() );
		$('.modal-trigger').leanModal();
	}

  	render() {
  		const { user } = this.props;

		return (

			<div>
				<div id="login-modal" className="modal">
				  <div className="modal-content">
				    <h4>Choose login method</h4>
				    <h5><a href="/auth/twitch">Twitch</a></h5>
				    <h5><a href="/auth/hitbox">Hitbox</a></h5>
				  </div>
				  <div className="modal-footer">
				    <a href="#" className=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
				  </div>
				</div>

				<nav className="green">
				  <div className="nav-wrapper">
				    <Link to="/" style={{padding: '0 10px'}} className="brand-logo waves-effect waves-block waves-light">Twitcherino</Link>
				    <ul className="right hide-on-med-and-down">
				    	<li><Link to="/streams" className="waves-effect waves-block waves-light">Streams</Link></li>
				    	<li><Link to="/games" className="waves-effect waves-block waves-light">Games</Link></li>
				    	{ user.userLoggedIn ? <li><Link to="/follows" className="waves-effect waves-block waves-light">Follows</Link></li> : null }
				    	{ user.userLoggedIn ? <li><Link to="/profile" className="waves-effect waves-block waves-light">Profile</Link></li> : null }
				    	{ !user.userLoggedIn ? <li><a href="#login-modal" className="waves-effect waves-block waves-light modal-trigger">Login</a></li> : null }
				    </ul>
				  </div>
				</nav>
			</div>
		);
  	}
}

export default connect(state => ({ user: state.user }))(Header);


