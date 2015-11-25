package routes

import (
    "app/server"

    "github.com/gin-gonic/gin"
)

var HomeRoute = map[string] *server.Route {

    "GET[/]": server.NewRoute("GET", "/", func(c *gin.Context) {
        c.HTML(200, "index.html", nil)
    }),

}

