#!/bin/bash

# Run this script as a root user

service mysqld start

npm install

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "    \n") -eq 0 ]
then
  # export PATH=/usr/local/bin:$PATH
  PATH_TO_APP=/var/app/current
  cd $PATH_TO_APP

  npm run build && forever start server/index.js
fi
