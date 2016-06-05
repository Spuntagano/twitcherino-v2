import passport from 'passport';
import { getUser, postUser, putUser } from './api/user.js';
import { getGateway, putGateway, deleteGateway } from './api/gateway.js';
import request from 'superagent';
import config from '../../config';

export default function(app) {
	app.get('/auth/twitch', passport.authenticate('twitch'));

	app.get('/auth/twitch/callback', 
		passport.authenticate('twitch', { failureRedirect: "/" }), (req, res) => {
			res.redirect('/');
		}
	);


	app.get('/auth/hitbox/', (req, res) => {
		res.redirect('https://api.hitbox.tv/oauth/login?app_token=' + config.HITBOX_TOKEN);
	});

	app.get('/auth/hitbox/callback',
	  passport.authenticate('custom', { failureRedirect: '/' }),
	  function(req, res) {
	    res.redirect('/');
	  });

	app.get('/api/user', getUser);
	app.post('/api/user', postUser);
	app.put('/api/user', putUser);
	app.get('/api/gateway/:path', getGateway);
	app.put('/api/gateway/:path', putGateway);
	app.delete('/api/gateway/:path', deleteGateway);
}