package main

import (
    "app/server"
)

func main() {
    app := server.Create(server.AppOptions{
        Asset: Asset,
        AssetDir: AssetDir,
	})
	app.Run()
}

