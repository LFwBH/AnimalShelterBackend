#!/bin/sh sh

docker build . --file Dockerfile --tag lfwbh/server:latest --tag lfwbh/server:$(date +%s)
