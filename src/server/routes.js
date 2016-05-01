import passport from 'passport';
import { getUser } from './api/user.js';
import { gateway } from './api/gateway.js';

export default function(app) {
	app.get('/auth/twitch', passport.authenticate('twitch'));

	app.get('/auth/twitch/callback', 
		passport.authenticate('twitch', { failureRedirect: "/" }), (req, res) => {
			res.redirect('/');
		}
	);

	app.get('/api/user', getUser);
	app.get('/api/gateway/:path', gateway);
}