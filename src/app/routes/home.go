package routes

import (
    "net/http"

    "app/server"

    "github.com/gin-gonic/gin"
)

var HomeRoute = []*server.Route{
    server.NewRoute("GET", "/", func(app *server.App, c *gin.Context) {
        c.HTML(200, "index.html", nil)
    }),
    server.NewRoute("GET", "/online", func(app *server.App, c *gin.Context) {
        c.String(http.StatusOK, "Hello %d", app.WebSocket.Hub().Len())
    }),
    server.NewRoute("GET", "/test", func(app *server.App, c *gin.Context) {
        c.String(http.StatusOK, "lol")
    }),
}

