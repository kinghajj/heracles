var cluster = require('cluster'),
    util    = require('util'),
    config  = require('./config');

var appname = 'app';

function log(s) {
  if(config.log)
    util.log(appname + ' worker ' + cluster.worker.id + ': ' + s);
}

module.exports = log;
module.exports.appname = appname;
