#!/bin/bash

# Set environment variables
export TCHAIN_API_URL=http://localhost:8081/t_chain_api/
export TCHAIN_DATABASE_ROOT=http://localhost:8081/database_api/

cd nginx/sbin
./nginx
echo $! > /tmp/nginx.pid

cd ../..

chmod +x data-server
nohup ./data-server & disown
echo $! > /tmp/data-server.pid