import AWS from 'aws-sdk';
import request from 'superagent';

export function gateway(req, res){

	const path = req.params.path;
	const query = req.query;

	

    return request
	  .get('https://o122vbyth9.execute-api.us-west-2.amazonaws.com/dev/' + path)
	  .query(query)
	  .set('Accept', 'application/json')
	  .set('user', 'Spuntagano')
	  .set('Authorization', 'OAuth ebrevy9d2d636iyhwopiix1bqkehgs')
	  .end((err, data) => {
	  	if (err){
	    	res.send(err);
	  	} else {
	  		res.send(JSON.parse(data.text));
	  	}
	  });
}