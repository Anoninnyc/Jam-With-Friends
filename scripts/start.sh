#!/bin/bash

# Run this script as a root user

service mysqld start

cd /var/app/current
npm install
npm run build
forever stop server/index.js
forever start server/index.js
