require('babel-register')({
  presets: [ 'es2015', 'react', 'stage-0' ]
});

var server = require("./src/server/server");
var express = require("express");
var CONSTS = require("./src/utils/consts");

server.default.listen(CONSTS.default.APP_PORT, function(e){
  if(e){
    console.error(e);
  }

  console.log('Server listening on ', CONSTS.default.APP_PORT);
});
