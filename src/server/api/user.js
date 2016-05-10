import AWS from 'aws-sdk';
import _ from 'underscore';

export function getUser(req, res){
	const dc = new AWS.DynamoDB.DocumentClient();
	const username = _.has(req.user, 'username') ? req.user.username : '';

	if (!username){
		res.send({
			userLoggedIn: false
		});
	} else {
		const params = {
		    TableName: 'Users',
		    Key:{
		    	'userId': 1
		    },
		    Item:{
		    	'userId': 1,
		    	'twitchUsername': username
		    }
		};

		dc.get(params, function(err, data) {
		    if (err) {
		    	console.log(err);
		    } else {
		    	res.send({
		    		userLoggedIn: true,
		    		userInfo: data.Item
		    	});
		    }
		});
	}
}

export function putUser(req, res){
	const dc = new AWS.DynamoDB.DocumentClient();
	const username = _.has(req.user, 'username') ? req.user.username : '';
	const newUsername = _.has(req.body.user, 'twitchUsername') ? req.body.user.twitchUsername : '';
	const oldUsername = _.has(req.body.oldUser, 'twitchUsername') ? req.body.oldUser.twitchUsername : '';

	if (!username || !oldUsername || !newUsername || username !== oldUsername){
		res.status(401);
		res.send({
			success: false,
			message: 'Unautenticated'
		});
	} else {
		const params = {
		    TableName: 'Users',
		    Key:{
		    	'userId': 1
		    },
		    Item:{
		    	'userId': 1,
		    	'twitchUsername': newUsername
		    }
		};

		dc.put(params, function(err, data) {
		    if (err) {
		    	console.log(err);
		    } else {
		    	res.status(200);
		    	res.send({
		    		success: true
		    	});
		    }
		});
	}
}