all: build

build:
	bash -c "./build.bash"

run:
	bash -c "./build.bash run"

clean:
	rm -rf bin src/_gen_*.go

