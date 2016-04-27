import AWS from 'aws-sdk';

export function getUser(req, res){
	const dc = new AWS.DynamoDB.DocumentClient();

	const params = {
	    TableName: 'Users',
	    Key:{
	    	'userId': 1
	    },
	    Item:{
	    	'userId': 1,
	    	'twitchUsername': req.user.username
	    }
	};

	dc.get(params, function(err, data) {
	    if (err) {
	    	console.log(err);
	    } else {
	    	res.send(data.Item);
	    }
	});
}