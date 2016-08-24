#!/bin/bash

BUILD_DIR=awsBuilds
CURRENT_COMMIT_HASH=$(git rev-parse HEAD)

mkdir $BUILD_DIR
git archive --verbose --format=zip HEAD > $BUILD_DIR/$CURRENT_COMMIT_HASH.zip
