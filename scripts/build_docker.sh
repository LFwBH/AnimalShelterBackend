docker buildx build --platform=linux/amd64 . --file Dockerfile --tag lfwbh/server:latest --tag lfwbh/server:$(date +%s)
