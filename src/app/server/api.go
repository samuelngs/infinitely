package server

import (
    "github.com/gin-gonic/gin"
)

type API struct{}

// Bind attaches api routes
func (api *API) Bind(group *gin.RouterGroup) {
    group.GET("/v1/config", api.ConfHandler)
}

// ConfHandler handle the app config, for example
func (api *API) ConfHandler(c *gin.Context) {
    app := c.MustGet("app").(*App)
    c.JSON(200, app.Conf.Root)
}

