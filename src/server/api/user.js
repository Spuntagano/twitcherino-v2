import AWS from 'aws-sdk';
import _ from 'underscore';
import uuid from 'uuid';

export function getUser(req, res){
	console.log(req.user);
	const dc = new AWS.DynamoDB.DocumentClient();
	const username = _.has(req.user, 'username') && typeof req.user.username === 'string' ? req.user.username : '';
	const userId = _.has(req.user, 'userId') && typeof req.user.userId === 'string' ? req.user.userId : '';

	if (!username){
		res.send({
			userLoggedIn: false
		});
	} else {
		const params = {
		    TableName: 'Users',
		    Key:{
		    	'userId': userId
		    },
		    Item:{
		    	'userId': userId,
		    	'twitchUsername': username
		    }
		};

		dc.get(params, function(err, data) {
		    if (err) {
		    	res.send(err);
		    } else {
		    	const Item = _.has(data, 'Item') && typeof data.Item === 'object' ? data.Item : {};
		    	res.send({
		    		userLoggedIn: true,
		    		userInfo: Item
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
	const userId = _.has(req.user, 'userId') && typeof req.user.userId === 'string' ? req.user.userId : '';

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
		    	'userId': userId
		    },
		    Item:{
		    	'userId': userId,
		    	'twitchUsername': newUsername
		    }
		};

		dc.update(params, function(err, data) {
		    if (err) {
		    	res.send(err);
		    } else {
		    	res.status(200);
		    	res.send({
		    		success: true
		    	});
		    }
		});
	}
}

export function postUser(req, res){
	const dc = new AWS.DynamoDB.DocumentClient();
	const username = _.has(req.body.user, 'twitchUsername') ? req.body.user.twitchUsername : '';
	const generatedId = uuid.v4();

	if (!username){
		res.status(400);
		res.send({
			success: false,
			message: 'Must provide a username'
		});
	} else {
		const params = {
		    TableName: 'Users',
		    Key:{
		    	'userId': generatedId
		    },
		    Item:{
		    	'userId': generatedId,
		    	'twitchUsername': username
		    }
		};

		dc.put(params, function(err, data) {
		    if (err) {
		    	res.send(err);
		    } else {
		    	res.status(200);
		    	res.send({
		    		success: true
		    	});
		    }
		});
	}
}