import server from "./src/server/server";
import express from "express";
import CONSTS from "./src/utils/consts";

server.listen(CONSTS.APP_PORT, function(e){
  if(e){
    console.error(e);
  } else{
  	console.log('Server listening on ', CONSTS.APP_PORT);
  }
});
