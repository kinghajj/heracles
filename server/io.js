var redis  = require('redis'),
    sio    = require('socket.io'),
    rstore = require('socket.io/lib/stores/redis'),
    config = require('./config'),
    db     = require('./db');

var io = sio.listen(config.port, { log: config.log });

io.set('store', new rstore({
  redis:       redis,
  redisPub:    db.clients.socket_io_pub,
  redisSub:    db.clients.socket_io_sub,
  redisClient: db.clients.socket_io_client
}));

module.exports = io;
