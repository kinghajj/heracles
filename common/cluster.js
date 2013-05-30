// cluster.js - factored-out common clustering pattern
// shared between app and web servers

var cluster = require('cluster'),
    util    = require('util'),
    __      = require('underscore');

module.exports = function(name, config, fork) {
  if(cluster.isMaster) {
    util.log(name + ' master: starting');
    cluster.on('fork', function(worker) {
      util.log(name + ' worker ' + worker.id + ': starting');
    });
    cluster.on('online', function(worker) {
      util.log(name + ' worker ' + worker.id + ': started');
    });
    cluster.on('exit', function(worker, code, signal) {
      util.log(name + ' worker ' + worker.id +
               ': ended by ' + signal + ' with ' + code);
      cluster.fork();
    });
    __.times(config.fork, cluster.fork);
  } else fork();
};
