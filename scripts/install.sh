#!/bin/bash

# Run this script as a root user

curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum -y install nodejs npm --enablerepo=epel
yum -y install mysql-server git curl
cp /home/ec2-user/.env /var/app/current -iv

npm install -g forever
