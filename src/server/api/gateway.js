import AWS from 'aws-sdk';
import request from 'superagent';
import _ from 'underscore';
import config from '../../../config';

export function getGateway(req, res){

	const path = _.has(req.params, 'path') && typeof req.params.path === 'string' ? req.params.path : '';
	const query = _.has(req, 'query') && typeof req.query === 'object' ? req.query : {};
	const username = _.has(req.user, 'username') && typeof req.user.username === 'string' ? req.user.username : '';
	const userId = _.has(req.user, 'userId') && typeof req.user.userId === 'string' ? req.user.userId : '';
	const dc = new AWS.DynamoDB.DocumentClient();

	if (username){
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
		    	res.send(err)
		    } else {
		    	const twitchUsername = _.has(data.Item, 'twitchUsername') && typeof data.Item.twitchUsername === 'string' ? data.Item.twitchUsername : '';
		    	const accessToken = _.has(data.Item, 'accessToken') && typeof data.Item.accessToken === 'string' ? data.Item.accessToken : '';

	    	    return request
	    		  .get(config.API_GATEWAY_BASE_URL + path)
	    		  .query(query)
	    		  .set('Accept', 'application/json')
	    		  .set('user', twitchUsername)
	    		  .set('Authorization', 'OAuth ' + accessToken)
	    		  .end((err, data) => {
	    		  	if (err){
	    		    	res.send(err);
	    		  	} else {
	    		  		const text = _.has(data, 'text') && typeof data.text === 'string' ? data.text : '';
	    		  		res.send(JSON.parse(text));
	    		  	}
	    		});
		    }
		});
	} else {
	    return request
		  .get(config.API_GATEWAY_BASE_URL + path)
		  .query(query)
		  .set('Accept', 'application/json')
		  .end((err, data) => {
		  	if (err){
		    	res.send(err);
		  	} else {
		  		const text = _.has(data, 'text') && typeof data.text === 'string' ? data.text : '';
		  		res.send(JSON.parse(text));
		  	}
		  });
	}
}


export function putGateway(req, res){

	const path = _.has(req.params, 'path') && typeof req.params.path === 'string' ? req.params.path : '';
	const query = _.has(req, 'query') && typeof req.query === 'object' ? req.query : {};
	const username = _.has(req.user, 'username') && typeof req.user.username === 'string' ? req.user.username : '';
	const userId = _.has(req.user, 'userId') && typeof req.user.userId === 'string' ? req.user.userId : '';
	const dc = new AWS.DynamoDB.DocumentClient();

	if (username){
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
		    	res.send(err)
		    } else {
		    	const twitchUsername = _.has(data.Item, 'twitchUsername') && typeof data.Item.twitchUsername === 'string' ? data.Item.twitchUsername : '';
		    	const accessToken = _.has(data.Item, 'accessToken') && typeof data.Item.accessToken === 'string' ? data.Item.accessToken : '';

	    	    return request
	    		  .put(config.API_GATEWAY_BASE_URL + path)
	    		  .query(query)
	    		  .set('Accept', 'application/json')
	    		  .set('user', twitchUsername)
	    		  .set('Authorization', 'OAuth ' + accessToken)
	    		  .end((err, data) => {
	    		  	if (err){
	    		    	res.send(err);
	    		  	} else {
	    		  		const text = _.has(data, 'text') && typeof data.text === 'string' ? data.text : '';
	    		  		res.send(JSON.parse(text));
	    		  	}
	    		});
		    }
		});
	} else {
	    return request
		  .get(config.API_GATEWAY_BASE_URL + path)
		  .query(query)
		  .set('Accept', 'application/json')
		  .end((err, data) => {
		  	if (err){
		    	res.send(err);
		  	} else {
		  		const text = _.has(data, 'text') && typeof data.text === 'string' ? data.text : '';
		  		res.send(JSON.parse(text));
		  	}
		  });
	}
}

export function deleteGateway(req, res){

	const path = _.has(req.params, 'path') && typeof req.params.path === 'string' ? req.params.path : '';
	const query = _.has(req, 'query') && typeof req.query === 'object' ? req.query : {};
	const username = _.has(req.user, 'username') && typeof req.user.username === 'string' ? req.user.username : '';
	const userId = _.has(req.user, 'userId') && typeof req.user.userId === 'string' ? req.user.userId : '';
	const dc = new AWS.DynamoDB.DocumentClient();

	if (username){
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
		    	res.send(err)
		    } else {
		    	const twitchUsername = _.has(data.Item, 'twitchUsername') && typeof data.Item.twitchUsername === 'string' ? data.Item.twitchUsername : '';
		    	const accessToken = _.has(data.Item, 'accessToken') && typeof data.Item.accessToken === 'string' ? data.Item.accessToken : '';

	    	    return request
	    		  .del(config.API_GATEWAY_BASE_URL + path)
	    		  .query(query)
	    		  .set('Accept', 'application/json')
	    		  .set('user', twitchUsername)
	    		  .set('Authorization', 'OAuth ' + accessToken)
	    		  .end((err, data) => {
	    		  	if (err){
	    		    	res.send(err);
	    		  	} else {
	    		  		const text = _.has(data, 'text') && typeof data.text === 'string' ? data.text : '';
	    		  		res.send(JSON.parse(text));
	    		  	}
	    		});
		    }
		});
	} else {
	    return request
		  .get(config.API_GATEWAY_BASE_URL + path)
		  .query(query)
		  .set('Accept', 'application/json')
		  .end((err, data) => {
		  	if (err){
		    	res.send(err);
		  	} else {
		  		const text = _.has(data, 'text') && typeof data.text === 'string' ? data.text : '';
		  		res.send(JSON.parse(text));
		  	}
		  });
	}
}