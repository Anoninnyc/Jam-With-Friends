#!/bin/sh
# Put this script in your git hooks repo
# https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps

WORK_TREE=var/app/current
GIT_DIR=/home/ec2-user/app.git


if [ ! -d $GIT_DIR ]; then
  # sudo needed because of permissions on directories. Not sure how to
  # ssh in directly as a root user. So the user I am `ssh`ing in as,
  # is a regular user.
  sudo mkdir $GIT_DIR
fi

git --work-tree=$WORK_TREE --git-dir=$GIT_DIR checkout -f

cd $WORK_TREE
# see note above regarding the sudo
sudo bash scripts/install.sh
sudo bash scripts/start.sh
