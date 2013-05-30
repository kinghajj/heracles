#!/bin/sh

kill $(cat tmp/web.pid)
rm -f tmp/web.pid
kill $(cat tmp/server.pid)
rm -f tmp/server.pid
