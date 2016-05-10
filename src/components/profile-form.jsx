import React from 'react';
import Router from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

class ProfileForm extends React.Component {

	constructor(props) {
	  	super(props);
	}

  	render() {
  		const {fields: {userId, twitchUsername, accessToken}, handleSubmit} = this.props;

		return (
			<div className="row">
				<div className="col s6">
					<form onSubmit={handleSubmit.bind(this)}>
					  <div className="input-field">
					    <input type="text" className="validate" {...userId}/>
					    <label className={userId && userId.value ? "active" : ""} htmlFor="userId">User ID</label>
					  </div>
					  <div className="input-field">
					    <input type="text" className="validate" {...twitchUsername}/>
					    <label className={twitchUsername && twitchUsername.value ? "active" : ""} htmlFor="twitchUsername">Twitch Username</label>
					  </div>
					  <div className="input-field">
					    <input type="text" className="validate" {...accessToken}/>
					    <label className={accessToken && accessToken.value ? "active" : ""} htmlFor="accessToken">Access Token</label>
					  </div>
					  <button className="btn waves-effect waves-block waves-light" type="submit">Submit</button>
					</form>
				</div>
	  		</div>
		);
  	}
}


ProfileForm = reduxForm({
  form: 'profile',
  fields: ['userId', 'twitchUsername', 'accessToken']
})(ProfileForm);

export default ProfileForm;

