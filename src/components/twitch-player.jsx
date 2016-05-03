import React from 'react';

class TwitchPlayer extends React.Component {

	constructor(props) {
	  	super(props);
	}

  	render() {
  		const twitchChannel = this.props.params.twitchChannel;

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
  			}
  		};

		return (
			<div>
				<iframe style={style.playerStyle} src={"https://player.twitch.tv/?channel=" + twitchChannel}></iframe>
				<iframe style={style.chatStyle} src={"https://www.twitch.tv/"+twitchChannel+"/chat?popout"}></iframe>
	  		</div>
		);
  	}
}

export default TwitchPlayer;

