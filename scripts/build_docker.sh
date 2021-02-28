#!/usr/bin/env bash

docker build . --file Dockerfile --tag lfwbh/server:latest --tag lfwbh/server:$(date +%s)
