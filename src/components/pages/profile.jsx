import React from 'react';
import Router from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetchUserIfNeeded, updateUser } from '../../actions/user-actions';
import ProfileForm from '../profile-form';

class Profile extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
		const { user, dispatch } = this.props;
		dispatch( fetchUserIfNeeded() ); //necessary?
	}

	handleSubmit(data) {
		const { user, dispatch } = this.props;

		dispatch( updateUser(data, user.userInfo) );
	}

  	render() {
  		const { user } = this.props;
  		let initialValues = {};

  		if (user && user.userInfo){
			initialValues = {
			    userId: user.userInfo.userId,
			    twitchUsername: user.userInfo.twitchUsername,
			    accessToken: user.userInfo.accessToken
	  		};
  		}
		return (
			<div>
				<h3>Profile</h3>
				<ProfileForm initialValues={initialValues} onSubmit={this.handleSubmit.bind(this)} />
			</div>
		);
  	}
}

export default connect(state => ({ user: state.user }))(Profile);

