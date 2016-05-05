import AWS from 'aws-sdk';

export function getUser(req, res){
	const dc = new AWS.DynamoDB.DocumentClient();

	let username = '';
	if (req.user){
		username = req.user.username;
	}

	if (!username){
		res.send({
			userLoggedIn: false
		});
		return;
	}

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