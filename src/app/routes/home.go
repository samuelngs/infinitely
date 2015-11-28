package routes

import (
    "app/server"

    "github.com/gin-gonic/gin"
)

var HomeRoute = []*server.Route{
    server.NewRoute("GET", "/", func(app *server.App, c *gin.Context) {
        c.HTML(200, "index.html", nil)
    }),
}

