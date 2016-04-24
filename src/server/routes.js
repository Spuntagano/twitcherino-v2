import passport from 'passport';

export default function(app) {
	app.get('/auth/twitch', passport.authenticate('twitch'));

	app.get('/auth/twitch/callback', 
		passport.authenticate('twitch', { failureRedirect: "/" }), (req, res) => {
			res.redirect('/');
		}
	)
}