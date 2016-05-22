import passport from 'passport';
import TwitchtvStrategy from 'passport-twitch';
import AWS from 'aws-sdk';
import uuid from 'uuid';
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
		const generatedId = uuid.v4();

		const paramsGet = {
		    TableName: 'Users',
		    IndexName: 'twitchUsername-index',
		    "KeyConditions": {
                    "twitchUsername": {
                        "AttributeValueList": [profile.username],
                        "ComparisonOperator": "EQ"
                    }
                }

		};

		const paramsNew = {
		    TableName: 'Users',
		    Key:{
		    	'userId': generatedId
		    },
		    Item:{
		    	'userId': generatedId,
		    	'twitchUsername': profile.username,
		    	'accessToken': accessToken
		    }
		};

		dc.query(paramsGet, function(err, data) {
		    if (err) {
		    	done(null, false);
		    } else if (data && _.isEmpty(data.Items)){
	        	dc.put(paramsNew, function(err, data) {
	        	    if (err) {
	        	        done(null, false);
	        	    } else {
	        	    	profile.userId = generatedId;
	        	        done(null, profile);
	        	    }
	        	});
		    } else {
		    	profile.userId = data.Items[0].userId;
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