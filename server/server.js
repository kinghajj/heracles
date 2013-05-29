var cluster = require('cluster');
var config  = require('./config');

if(cluster.isMaster) {
  cluster.on('exit', cluster.fork);
  for(var i = 0; i < config.fork; i++) cluster.fork();
} else {
  var io = require('socket.io').listen(config.port, { log: false });
}
