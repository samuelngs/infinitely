package routes

import (
    "github.com/gin-gonic/gin"
)

func HomeGet(c *gin.Context) {
    c.HTML(200, "index.html", nil)
}
