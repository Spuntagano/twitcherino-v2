import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/pages/home';
import Games from './components/pages/games';
import GameStreams from './components/pages/game-streams';
import Streams from './components/pages/streams';
import Follows from './components/pages/follows';
import GameRoot from './components/game-root';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/streams" component={Streams}/>
		<Route path="/follows" component={Follows}/>
		<Route path="/games" component={GameRoot}>
			<IndexRoute component={Games} />
			<Route path="/games/:gameId" component={GameStreams}/>
		</Route>
	</Route>
);