package server

import (

    "fmt"
    "time"
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/gorilla/websocket"
)

const (
    // Time allowed to write a message to the peer.
    writeWait = 10 * time.Second
    // Time allowed to read the next pong message from the peer.
    pongWait = 60 * time.Second
    // Send pings to peer with this period. Must be less than pongWait.
    pingPeriod = (pongWait * 9) / 10
    // Maximum message size allowed from peer.
    maxMessageSize = 512
    // TextMessage denotes a text data message. The text message payload is
    // interpreted as UTF-8 encoded text data.
    TextMessage = 1
    // BinaryMessage denotes a binary data message.
    BinaryMessage = 2
    // CloseMessage denotes a close control message. The optional message
    // payload contains a numeric code and text. Use the FormatCloseMessage
    // function to format a close message payload.
    CloseMessage = 8
    // PingMessage denotes a ping control message. The optional message payload
    // is UTF-8 encoded text.
    PingMessage = 9
    // PongMessage denotes a ping control message. The optional message payload
    // is UTF-8 encoded text.
    PongMessage = 10
    // Message Types
)

type WebSocket struct {
    upgrader websocket.Upgrader
    hub *Hub
}

func CreateWebSocket() *WebSocket {
    h := &Hub {
        nil,
        map[*websocket.Conn]*Session {},
        map[string]*Channel {},
    }
    ws := &WebSocket {
        websocket.Upgrader {
            ReadBufferSize:  1024,
            WriteBufferSize: 1024,
        },
        h,
    }
    h.ws = ws
    return ws
}

func (ws *WebSocket) Handler(w http.ResponseWriter, r *http.Request) {
    conn, err := ws.upgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println("Failed to set websocket upgrade:", err)
    } else {
        s := ws.hub
        defer func() {
            s.UnBind(conn)
        }()
        s.Bind(conn).ReadMessages()
    }
}

func (ws *WebSocket) Bind(app *App) {
    app.Engine.GET("/sync", func(c *gin.Context) {
        ws.Handler(c.Writer, c.Request)
    });
}

func (ws *WebSocket) Hub() *Hub {
    return ws.hub
}

