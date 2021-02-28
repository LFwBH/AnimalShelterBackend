#!/usr/bin/env bash

export NODE_ENV=production

docker build . --file Dockerfile --tag lfwbh/server:latest --tag lfwbh/server:$(date +%s)
