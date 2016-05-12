import server from "./src/server/server";
import express from "express";
import config from "./config";

server.listen(config.APP_PORT, function(e){
  if(e){
    console.error(e);
  } else{
  	console.log('Server listening on ', config.APP_PORT);
  }
});
