import AWS from 'aws-sdk';
import request from 'superagent';

export function gateway(req, res){

	const path = req.params.path;
	const query = req.query;

	let username = '';
	if (req.user){
		username = req.user.username;
	}

	const dc = new AWS.DynamoDB.DocumentClient();

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

	if (username){
		dc.get(params, function(err, data) {
		    if (err) {
		    	console.log(err);
		    } else {
	    	    return request
	    		  .get('https://o122vbyth9.execute-api.us-west-2.amazonaws.com/dev/' + path)
	    		  .query(query)
	    		  .set('Accept', 'application/json')
	    		  .set('user', data.Item.accessToken)
	    		  .set('Authorization', 'OAuth ' + data.Item.accessToken)
	    		  .end((err, data) => {
	    		  	if (err){
	    		    	res.send(err);
	    		  	} else {
	    		  		res.send(JSON.parse(data.text));
	    		  	}
	    		});
		    }
		});
	} else {
	    return request
		  .get('https://o122vbyth9.execute-api.us-west-2.amazonaws.com/dev/' + path)
		  .query(query)
		  .set('Accept', 'application/json')
		  .end((err, data) => {
		  	if (err){
		    	res.send(err);
		  	} else {
		  		res.send(JSON.parse(data.text));
		  	}
		  });
	}
}