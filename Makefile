all:
	@./build.bash all ||:

dev:
	@./build.bash dev ||:

build:
	@./build.bash build ||:

assets:
	@./build.bash assets ||:

run:
	@./build.bash run $@ ||:

clean:
	@./build.bash clean ||:

