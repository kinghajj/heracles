var redis  = require('redis'),
    config = require('./config'),
    log    = require('./log');

log('making db connections...');

var clients = {};

for(var client in config.db.clients) {
  var cconfig = config.db.clients[client];
  var rconfig = config.db.redii[cconfig[0]];
  clients[client] = redis.createClient(rconfig.port, rconfig.host);
  clients[client].select(cconfig[1] || 0);
}

log('db connections established');

exports.clients = clients;
