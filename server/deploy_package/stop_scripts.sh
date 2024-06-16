#!/bin/bash

kill $(cat /tmp/nginx.pid)
kill $(cat /tmp/data-server.pid)

rm /tmp/nginx.pid
rm /tmp/data-server.pid