package server

import (
    "github.com/gin-gonic/gin"
)

var RouteMethods = []string{
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
}

type Route struct {
    Method string
    URI string
    Callback gin.HandlerFunc
}

func NewRoute(method string, uri string, callback gin.HandlerFunc) *Route {
    route := &Route{
        Method  : method,
        URI     : uri,
        Callback: callback,
    }
    return route.init()
}

func (route *Route) init() *Route {
    var validMethod = false
    for _, c := range RouteMethods {
        if (c == route.Method) {
            validMethod = true
        }
    }
    if (!validMethod) {
        panic("Route method is invalid")
    }
    if (route.URI == "") {
        panic("Route URI is invalid")
    }
    if (route.Callback == nil) {
        panic("Route requires a callback function")
    }
    return route
}

