var config  = require('./config'),
    cluster = require('./../common/cluster');

cluster('app', config, function() {
  var io = require('socket.io').listen(config.port, { log: false });
});
