package routes

import (
    "net/http"

    "app/server"

    "github.com/gin-gonic/gin"
)

var HomeRoute = map[string] *server.Route {

    "GET[/]": server.NewRoute("GET", "/", func(c *gin.Context) {
        c.HTML(200, "index.html", nil)
    }),

    "GET[/online]": server.NewRoute("GET", "/online", func(c *gin.Context) {
        app := c.MustGet("app").(*server.App)
        c.String(http.StatusOK, "Hello %d", app.WebSocket.Sessions.Count())
    }),

}

