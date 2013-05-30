// web.js - a simple clustered static web server for node.js
// maybe call it 'achilles'
//
// At least one benchmark[1] suggests that such a server can outperform nginx.
// I performed some on my laptop with `sudo ab -n 100000 -c 500', setting up
// both servers to use eight workers. I found that nginx can serve static files
// at around 26k req/s, with 99% of requests served within 22ms, though the
// longest could take up to 3000ms. This server serves at around 12k req/s, with
// 99% of requests within 78ms, and the longest taking just over 1000ms. When I
// ran a benchmark over Wi-Fi with `siege -b -t 5s -c 100', both servers
// approached 1.5k req/s. So while its maximum local performance may be lower,
// its practical network performance seems to match nginx's, so it should be
// suitable for use both in development and production settings.
//
// 1. http://centminmod.com/siegebenchmarks/2013/020313/index.html

var fs      = require('fs'),
    http    = require('http'),
    path    = require('path'),
    url     = require('url'),
    util    = require('util'),
    config  = require('./config'),
    cluster = require('./../common/cluster');

function handler(req, res) {
  var pathname = url.parse(req.url).pathname;
  // find out if this pathname is special
  var spec = config.spec[pathname] || {};
  // create the path to the actual file on disk
  var req_path = path.join(config.root, path.normalize(spec.rdir || pathname));
  fs.stat(req_path, function(err, stats) {
    // if error or not file, redirect to 404 path
    if(err || !stats.isFile()) {
      res.writeHead(303, { Location: '/' } );
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': config.mime[path.extname(pathname)] });
    fs.createReadStream(req_path).pipe(res);
  });
}

cluster('web', config, function() {
  http.createServer(handler).listen(config.port, config.hostname, config.backlog);
});
