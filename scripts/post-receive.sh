#!/bin/sh
# Put this script in your git hooks repo
# https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps

WORK_TREE=var/app/current
GIT_DIR=$HOME/app.git
mkdir $WORK_TREE
mkdir $GIT_DIR

git --work-tree=$WORK_TREE --git-dir=$GIT_DIR checkout -f

cd $WORK_TREE
npm start
