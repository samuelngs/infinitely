all:
	@./build.bash all ||:

build:
	@./build.bash build ||:

assets:
	@./build.bash assets ||:

run:
	@./build.bash run ||:

clean:
	@./build.bash clean ||:

