var config  = require('./config'),
    log     = require('./log'),
    cluster = require('./../common/cluster');

cluster(log.appname, config, function() {
  require('./scripts');
  require('./io');
});
