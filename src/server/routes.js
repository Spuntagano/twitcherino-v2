import passport from 'passport';
import { getUser, postUser, putUser } from './api/user.js';
import { gateway } from './api/gateway.js';

export default function(app) {
	app.get('/auth/twitch', passport.authenticate('twitch'));

	app.get('/auth/twitch/callback', 
		passport.authenticate('twitch', { failureRedirect: "/" }), (req, res) => {
			res.redirect('/');
		}
	);

	app.get('/api/user', getUser);
	app.post('/api/user', postUser);
	app.put('/api/user', putUser);
	app.get('/api/gateway/:path', gateway);
}