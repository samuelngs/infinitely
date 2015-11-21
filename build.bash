#!/bin/bash

section() {
    if [ ! -z "$1" ]; then
        echo
        echo "- $1"
        echo
    fi
}

_ARCH() {
    _MACHINET=`uname -m`
    _ARCH=
    if [[ "$_MACHINET" == 'x86_64' ]]; then
        _ARCH='amd64'
    else
        _ARCH='386'
    fi
    eval "$1=$_ARCH"
}

_PLATFORM() {
    _UNAME=`uname`
    _PLATFORM=
    if [[ "$_UNAME" == 'Linux' ]]; then
        _PLATFORM='linux'
    elif [[ "$_UNAME" == 'Darwin' ]]; then
        _PLATFORM='darwin'
    else
        _PLATFORM='windows'
    fi
    eval "$1=$_PLATFORM"
}

# OPTIONS: 386 amd64
if [ -z $ARCH ]; then
    _ARCH ARCH
fi

# OPTIONS: darwin linux windows
if [ -z $PLATFORM ]; then
    _PLATFORM PLATFORM
fi

section "Download packages"

for DEP in `go list -json ./src/... | jq '.Imports[]'`
do
    DEP="${DEP%\"}"
    DEP="${DEP#\"}"
    if [[ "$DEP" != _* ]]; then
        echo " Importing $DEP..."
        eval "go get $DEP"
    fi
done

section "Packing resources"

if ! which "go-bindata" >/dev/null; then
    go get -u github.com/jteeuwen/go-bindata/...
fi

echo " # templates"
$GOPATH/bin/go-bindata -ignore=\\.gitignore -o src/_gen_templates.go src/templates
echo " # assets"
$GOPATH/bin/go-bindata -ignore=\\.gitignore -o src/_gen_assets.go src/assets

section "Building binary"

for GOOS in $PLATFORM; do
    for GOARCH in $ARCH; do
        echo " Building $GOOS-$GOARCH"
        GOOS=$GOOS GOARCH=$GOARCH go build -o bin/infinitely-$GOOS-$GOARCH src/main.go
    done
done

if [ ! -z "$1" ]; then

    section "Running executable application"

    _PLATFORM PLATFORM
    _ARCH ARCH

    bin/infinitely-$PLATFORM-$ARCH

fi

