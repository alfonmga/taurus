#!/bin/bash

# Deploy previous tagged docker image
ssh root@142.93.54.115 "dokku tags:deploy taurus-api previous"
