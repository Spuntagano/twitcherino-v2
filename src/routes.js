import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/pages/home';
import GamesDirectory from './components/pages/gamesDirectory';
import StreamsByGame from './components/pages/streamsByGame';
import Directory from './components/pages/directory';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="directory" component={Directory}/>
		<Route path="games" component={GamesDirectory}/>
		<Route path="/games/:gameId" component={StreamsByGame}/>
	</Route>
);