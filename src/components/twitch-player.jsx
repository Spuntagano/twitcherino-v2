import React from 'react';
import { connect } from 'react-redux';
import radium from 'radium';
import { fetchFollowIfNeeded, addFollow, removeFollow } from '../actions/follow-actions';

class TwitchPlayer extends React.Component {

	constructor(props) {
	  	super(props);
	}

	componentDidMount() {
		const { params, dispatch } = this.props;
		const twitchChannel = params.twitchChannel;

		dispatch( fetchFollowIfNeeded(twitchChannel) );
	}

	addFollow() {
		const { params, dispatch } = this.props;
		const twitchChannel = params.twitchChannel;

		dispatch( addFollow(twitchChannel) );
	}

	removeFollow() {
		const { params, dispatch } = this.props;
		const twitchChannel = params.twitchChannel;

		dispatch( removeFollow(twitchChannel) );
	}

  	render() {
  		const { params, follow, dispatch } = this.props;
  		const twitchChannel = params.twitchChannel;

  		const style = {
  			playerStyle: {
	  			width: 'calc(100% - 340px)',
	  			height: 'calc(100% - 64px)',
	  			border: 'none',
	  			position: 'fixed'
  			},
  			chatStyle: {
	  			border: 'none',
	  			width: '340px',
	  			height: 'calc(100% - 64px)',
	  			position: 'fixed',
	  			right: '0'
  			},
  			follow: {
  				position: 'absolute',
  				right: '390px',
  				top: '104px',
  				zIndex: '1',
  				cursor: 'pointer'
  			}
  		};

		return (
			<div>
				{follow.follow ? <div onClick={this.removeFollow.bind(this)} style={style.follow}>unfollow</div> : <div onClick={this.addFollow.bind(this)} style={style.follow}>follow</div>}
				<iframe style={style.playerStyle} src={"https://player.twitch.tv/?channel=" + twitchChannel}></iframe>
				<iframe style={style.chatStyle} src={"https://www.twitch.tv/"+twitchChannel+"/chat?popout"}></iframe>
	  		</div>
		);
  	}
}

export default connect(state => ({ follow: state.follow }))(radium(TwitchPlayer));
