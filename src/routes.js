import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/pages/home';
import Games from './components/pages/games';
import GameStreams from './components/pages/game-streams';
import Streams from './components/pages/streams';
import Follows from './components/pages/follows';
import GameRoot from './components/game-root';
import TwitchRoot from './components/twitch-root';
import TwitchPlayer from './components/twitch-player';
import Profile from './components/pages/profile';
import isBrowser from './utils/is-browser';

function requireAuth(userLoggedIn, nextState, replace) {
	if (isBrowser && !userLoggedIn){
		replace('/');
	}
}

export default function(userLoggedIn){
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/streams" component={Streams}/>
			<Route path="/follows" component={Follows} onEnter={requireAuth.bind(this, userLoggedIn)}/>
			<Route path="/games" component={GameRoot}>
				<IndexRoute component={Games} />
				<Route path="/games/:gameId" component={GameStreams}/>
			</Route>
			<Route path="/twitch" component={GameRoot}>
				<IndexRoute component={TwitchRoot} />
				<Route path="/twitch/:twitchChannel" component={TwitchPlayer}/>
			</Route>
			<Route path="/profile" component={Profile} onEnter={requireAuth.bind(this, userLoggedIn)}/>
		</Route>
	);
}