package ws

import (
    "fmt"
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader {
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

func Sync(c *gin.Context) {
    wsHandler(c.Writer, c.Request)
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println("Failed to set websocket upgrade:", err)
    } else {
        c := &Connection{send: make(chan []byte, 256), ws: conn}
        ag.register <- c
        fmt.Println("print")
        go c.writePump()
        c.readPump()
    }
}

