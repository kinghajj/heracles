var fs     = require('fs'),
    path   = require('path'),
    config = require('./config'),
    db     = require('./db')
    log    = require('./log');

log('loading scripts...');
var hashes = {}, scripts = {};

function remember(script) {
  return function(err, sha) {
    if(err) throw err;
    log('loaded script `' + script + '`');
    hashes[script] = sha;
  }
}

function create(dir, script) {
  return function(client) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    var callback = args.pop();
    if(typeof(callback) !== 'function') {
      args.push(callback);
      callback = undefined;
    }
    args.unshift(hashes[script], config.scripts[dir][script]);
    client.evalsha(args, callback);
  };
}

// load scripts into db and save their hashes under their base names
for(var dir in config.scripts) {
  for(var script in config.scripts[dir]) {
    var script_path = path.join(dir, script + '.lua');
    var script_prog = fs.readFileSync(script_path).toString();
    db.clients.heracles_game.script('load', script_prog, remember(script));
    scripts[script] = create(dir, script);
  }
}

log('finished loading scripts');

module.exports = scripts;
