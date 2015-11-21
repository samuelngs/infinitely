package main

import (

    "fmt"
    "runtime"

    "github.com/gin-gonic/gin"

    "./routes"
    "./ws"
)

const (
    port = ":3000"
)

func main() {
    configureRuntime()
    startServer()
}

func configureRuntime() {
    numCPU := runtime.NumCPU()
    runtime.GOMAXPROCS(numCPU)
    fmt.Printf("Running with %d CPUs\n", numCPU)
}

func startServer() {

    router := gin.Default()

    router.Static("/assets", "src/assets")
    router.LoadHTMLGlob("src/templates/*")

    router.GET("/", routes.HomeGet)

    router.GET("/sync", ws.Sync);

    router.Run(port)
}

