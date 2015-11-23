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

GEN_ASSETS() {
	for RES in $@; do
		echo " # $RES"
		$GOPATH/bin/go-bindata -ignore=\\.gitignore -o "src/_gen_$RES.go" src/$RES
	done
}

case $1 in
	build)
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

		./$0 assets

		section "Building binary"

		for GOOS in $PLATFORM; do
			for GOARCH in $ARCH; do
				echo " Building bin/infinitely-$GOOS-$GOARCH"
				GOOS=$GOOS GOARCH=$GOARCH go build -o bin/infinitely-$GOOS-$GOARCH src/main.go
			done
		done
		;;
	assets)
		if [ -z "$ASSETS" ]; then
			ASSETS=("templates" "assets")
		fi

		section "Packing resources"

		if ! which "go-bindata" >/dev/null; then
			go get -u github.com/jteeuwen/go-bindata/...
		fi

		GEN_ASSETS ${ASSETS[@]}
		;;
	run)

		section "Running executable application"

		_PLATFORM PLATFORM
		_ARCH ARCH

		if [ ! -f bin/infinitely-$PLATFORM-$ARCH ]; then
			PLATFORM=$PLATFORM ARCH=$ARCH ./$0 build
		fi

		bin/infinitely-$PLATFORM-$ARCH
		;;
	clean)
		rm -rf bin src/_gen_*.go
		;;
	all)
		./$0 clean
		./$0 build
		./$0 run
		;;
	*)
		echo "$0

Build script for Infinitely

USAGE:

   [ENV_ARGS] $0 [OPTIONS]

OPTIONS:

   build		create binary executable
   assets		compile assets

   clean		clean project

   run			start program
   all			compile assets, create executable file and run program
"
		;;
esac

