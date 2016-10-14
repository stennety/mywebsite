#!/bin/bash

docker run --rm -v $(pwd):/site -p 4000:4000 andredumas/github-pages serve --watch
