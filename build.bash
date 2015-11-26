#!/bin/bash

set -e
set -o pipefail

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

GEN_ASSETS() {
    ASSETS_PATH=
    if ! which npm > /dev/null; then
        echo "[ notice ] please install npm"
        exit 0
    fi
    if [ ! -d node_modules ] || [ ! -d node_modules/.bin ] || [ ! -f node_modules/.bin/gulp ]; then
        npm install
    fi
    if [[ $BUILD_TARGET == "development" ]]; then
        node_modules/.bin/gulp --development
    else
        node_modules/.bin/gulp
    fi
    echo
    if [ ! -f $GOPATH/bin/go-bindata ]; then
        go get -u github.com/jteeuwen/go-bindata/...
    fi
    for RES in $@; do
        echo " # $RES"
        ASSETS_PATH="./src/$RES/... $ASSETS_PATH"
    done
    $GOPATH/bin/go-bindata -o src/assets.go -prefix "src/" $ASSETS_PATH
    echo
}

GOPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export GOPATH=$GOPATH

case $1 in
    dev)
        GOPATH=$GOPATH $EDITOR
        ;;
    build)
        # OPTIONS: 386 amd64
        if [[ -z $ARCH ]]; then
            _ARCH ARCH
        fi

        # OPTIONS: darwin linux windows
        if [[ -z $PLATFORM ]]; then
            _PLATFORM PLATFORM
        fi

        section "Download packages"

        DEPS=`go list -f '{{range $dep := .Deps}}{{printf "%s\n" $dep}}{{end}}' ./src/... | grep github.com | sort | uniq`

        for DEP in $DEPS
        do
            DEP="${DEP%\"}"
            DEP="${DEP#\"}"
            if [[ "$DEP" != _* ]]; then
                echo " Importing $DEP..."
                go get $DEP
            fi
        done

        ./$0 assets

        section "Building binary"

        for GOOS in $PLATFORM; do
            for GOARCH in $ARCH; do
                echo " Building bin/infinitely-$GOOS-$GOARCH"
                GOOS=$GOOS GOARCH=$GOARCH go build -ldflags "-X main.Gitbranch=`git rev-parse --abbrev-ref HEAD` -X main.Githash=`git rev-parse HEAD` -X main.Buildstamp=`date -u '+%Y-%m-%d_%I:%M:%S%p'`" -o bin/infinitely-$GOOS-$GOARCH src/main.go src/assets.go
            done
        done
        ;;
    assets)
        if [[ -z "$ASSETS" ]]; then
            ASSETS=("templates" "static")
        fi

        section "Packing resources"

        GEN_ASSETS ${ASSETS[@]}
        ;;
    run)

        section "Running executable application"

        _PLATFORM PLATFORM
        _ARCH ARCH

        if [ ! -f bin/infinitely-$PLATFORM-$ARCH ]; then
            PLATFORM=$PLATFORM ARCH=$ARCH ./$0 build
        fi

        GOPATH=$GOPATH bin/infinitely-$PLATFORM-$ARCH start
        ;;
    clean)
        rm -rf bin pkg node_modules src/golang.org src/gopkg.in src/github.com src/assets.go src/static/styles/*.css src/static/js/*.min.js
        ;;
    all)
        ./$0 build
        ./$0 run
        ;;
    *)
        echo "$0

Build script for Infinitely

USAGE:

   [ENV_ARGS] $0 [OPTIONS]

OPTIONS:

   dev          open project in editor ($EDITOR)

   build        create binary executable [ARCH, PLATFORM]
   assets       compile assets [ASSETS]

   clean        clean project

   run          start program
   all          compile assets, create executable file and run program [ARCH, PLATFORM, ASSETS]
"
        ;;
esac

