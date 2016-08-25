#!/bin/bash

# Run this script as a root user

service mysqld start

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "    \n") -eq 0 ]
then
  cd /var/app/current
  npm install
  npm run build
  forever start server/index.js
fi
