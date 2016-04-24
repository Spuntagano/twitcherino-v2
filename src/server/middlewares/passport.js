import passport from 'passport';
import TwitchtvStrategy from 'passport-twitch';
import AWS from 'aws-sdk';
import _ from 'underscore';

export default function(app) {
	app.use(passport.initialize());
	const db = new AWS.DynamoDB.DocumentClient();

	passport.use(new TwitchtvStrategy.Strategy({
		clientID: 'ooq4s9m1tk6rhws89qgy6xlhvxnnm1k',
		clientSecret: 'q71cphbiro9r5rqc1lnwos907heucq8',
		callbackURL: 'http://localhost:3000/auth/twitch/callback',
		scope: ['user_read', 'user_follows_edit'],
		passReqToCallback : true
	},
	(req, accessToken, refreshToken, profile, done) => {

		const params = {
		    TableName: 'Users',
		    Key:{
		    	'userId': 1
		    },
		    Item:{
		    	'userId': 1,
		    	'twitchUsername': profile.username
		    }
		};

		db.get(params, function(err, data) {
		    if (err) {
		    	done(null, false);
		    } else if (_.isEmpty(data)){
	        	db.put(params, function(err, data) {
	        		console.log(err);
	        	    if (err) {
	        	        done(null, false);
	        	    } else {
	        	        done(null, profile);
	        	    }
	        	});
		    } else {
		        done(null, profile);
		    }
		});
	}));

	passport.serializeUser( (user, done) => {
		if (user){
			done(null, user);
		}
	});

	passport.deserializeUser( (obj, done) => {
		if (obj){
			done(null, obj);
		}
		else {
			done(null, false);
		}
	});
}