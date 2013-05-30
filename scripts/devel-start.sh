#!/bin/sh

mkdir -p tmp
node server/server.js >>tmp/server.log 2>>tmp/server.err &
echo $! >tmp/server.pid
node web/web.js >>tmp/web.log 2>>tmp/web.err &
echo $! >tmp/web.pid
