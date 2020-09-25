#!/bin/bash

# build docker image
docker build -f ./api.dockerfile -t dokku/taurus-api:latest . &&
  # tag current production docker image as previous
  ssh root@142.93.54.115 "dokku tags:create taurus-api previous" &&
  # copy the created docker image to the dokku host and tag it as latest
  docker save dokku/taurus-api:latest | bzip2 | ssh root@142.93.54.115 "bunzip2 | docker load" &&
  # deploy latest docker image
  ssh root@142.93.54.115 "dokku tags:deploy taurus-api latest"
