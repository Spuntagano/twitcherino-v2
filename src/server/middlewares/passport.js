import passport from 'passport';
import TwitchtvStrategy from 'passport-twitch';
import CustomStrategy from 'passport-custom';
import AWS from 'aws-sdk';
import uuid from 'uuid';
import _ from 'underscore';
import config from '../../../config';
import request from 'superagent';
import normalizeHitboxUser from '../../utils/normalize-hitbox-user';


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
		    	'twitchAccessToken': accessToken
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

	passport.use(new CustomStrategy(
	  function(req, done) {
	  	const generatedId = uuid.v4();
	  	const hash = new Buffer(config.HITBOX_TOKEN + config.HITBOX_SECRET).toString('base64');

	  	if (req.query.authToken) {
	  		const authToken = req.query.authToken;
  		    return request
  				.get('https://api.hitbox.tv/userfromtoken/' + authToken)
  				.set('Accept', 'application/json')
  				.end((err, res) => {
	  			  	if (!err) {
	  			  		const username = res.body.user_name
			    	    return request
			    			.get('https://api.hitbox.tv/user/' + username)
			    			.query({authToken})
			    			.set('Accept', 'application/json')
			    			.end((err, res) => {
			    		  	if (!err){
			    		  		const profile = normalizeHitboxUser(res.body);


	    		  				const paramsGet = {
	    		  				    TableName: 'Users',
	    		  				    IndexName: 'hitboxUsername-index',
	    		  				    "KeyConditions": {
	    		  		                    "hitboxUsername": {
	    		  		                        "AttributeValueList": [username],
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
	    		  				    	'hitboxUsername': username,
	    		  				    	'hitboxAccessToken': authToken
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
			    		  	} else{
			    		  		done(null, false);
			    		  	}
			    		});
	  			  	} else{
	  			  		done(null, false);
	  			  	}
	  			}
  			);
	  	} else if (req.query.request_token){
	  	    return request
	  			.post('https://api.hitbox.tv/oauth/exchange')
	  	    	.send({
	  	    		request_token: req.query.request_token,  
	  	    		app_token: config.HITBOX_TOKEN,  
	  	    		hash,
	  	    	})
	  			.set('Accept', 'application/json')
	  			.end((err, res) => {
	  		  	if (!err){
	  		  		const authToken = res.body.access_token;
  		    	    return request
  		    			.get('https://api.hitbox.tv/userfromtoken/' + authToken)
  		    			.set('Accept', 'application/json')
  		    			.end((err, res) => {
	  		    		  	if (!err){
			  			  		const username = res.body.user_name
					    	    return request
					    			.get('https://api.hitbox.tv/user/' + username)
					    			.query({authToken})
					    			.set('Accept', 'application/json')
					    			.end((err, res) => {
					    		  	if (!err){
					    		  		const profile = normalizeHitboxUser(res.body);


			    		  				const paramsGet = {
			    		  				    TableName: 'Users',
			    		  				    IndexName: 'hitboxUsername-index',
			    		  				    "KeyConditions": {
			    		  		                    "hitboxUsername": {
			    		  		                        "AttributeValueList": [username],
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
			    		  				    	'hitboxUsername': username,
			    		  				    	'hitboxAccessToken': authToken
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
					    		  	} else{
					    		  		done(null, false);
					    		  	}
					    		});
	  		    		  	} else {
	  		    		  		done(null, false);
	  		    		  	}
	  		    		});
	  		  	} else {
	  		  		done(null, false);
	  		  	}
	  		});
	  	} else {
	  		done(null, false);
	  	}
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