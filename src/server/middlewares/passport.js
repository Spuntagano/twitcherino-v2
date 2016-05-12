import passport from 'passport';
import TwitchtvStrategy from 'passport-twitch';
import AWS from 'aws-sdk';
import _ from 'underscore';
import config from '../../../config';

export default function(app) {
	app.use(passport.initialize());
	app.use(passport.session());
	const dc = new AWS.DynamoDB.DocumentClient();

	passport.use(new TwitchtvStrategy.Strategy({
		clientID: config.CLIENT_ID,
		clientSecret: config.CLIENT_SECRET,
		callbackURL: config.PASSPORT_CALLBACK_URL,
		scope: config.PASSPORT_SCOPE,
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
		    	'twitchUsername': profile.username,
		    	'accessToken': accessToken
		    }
		};

		dc.put(params, function(err, data) {
		    if (err) {
		        done(null, false);
		    } else {
		        done(null, profile);
		    }
		});
/*
		dc.get(params, function(err, data) {
		    if (err) {
		    	done(null, false);
		    } else if (_.isEmpty(data)){
	        	dc.put(params, function(err, data) {
	        	    if (err) {
	        	        done(null, false);
	        	    } else {
	        	        done(null, profile);
	        	    }
	        	});
		    } else {
		        done(null, profile);
		    }
		});*/
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