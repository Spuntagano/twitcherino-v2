import AWS from 'aws-sdk';
import request from 'superagent';

export function getFollows(req, res){

    return request
	  .get('https://api.twitch.tv/kraken/streams/followed')
	  .set('Accept', 'application/json')
	  .set('Authorization', 'OAuth zsjnylxre7ugvah6azebq2bwdi2ij3')
	  .end((err, data) => {
	  	if (err){
	    	res.send(err);
	  	} else {
	  		res.send(data.text);
	  	}
	  });
}