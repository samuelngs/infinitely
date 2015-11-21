
package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func main() {

    r := gin.Default()

    r.GET("/ping", func(c *gin.Context) {
        c.String(200, "pong")
    })

    r.GET("/welcome", func(c *gin.Context) {
        firstname := c.DefaultQuery("firstname", "Guest")
        lastname := c.Query("lastname") // shortcut for c.Request.URL.Query().Get("lastname")

        c.String(http.StatusOK, "Hello %s %s", firstname, lastname)
    })

    r.Run(":3000")
}
