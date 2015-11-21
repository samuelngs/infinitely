#!/bin/bash

# OPTIONS: 386 amd64
if [ -z $ARCH ]; then
    ARCH="amd64"
fi

# OPTIONS: darwin linux windows
if [ -z $PLATFORM ]; then
    PLATFORM="linux"
fi

echo
echo "- Download Packages"
echo

for DEP in `go list -json ./src/... | jq '.Imports[]'`
do
    echo " Importing $DEP..."
    eval "go get $DEP"
done

echo
echo "- Building binary"
echo

for GOOS in $PLATFORM; do
  for GOARCH in $ARCH; do
    echo "Building $GOOS-$GOARCH"
    export GOOS=$GOOS
    export GOARCH=$GOARCH
    go build -o bin/infinitely-$GOOS-$GOARCH src/main.go
  done
done
