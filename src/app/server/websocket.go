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
    h := &Hub{
        events      : make(map[string]*WebSocketEvent),
        connections : make(map[*websocket.Conn]*Session),
        channels    : make(map[string]*Channel),
        broadcast   : make(chan *Queue),
        register    : make(chan *Queue),
        unregister  : make(chan *Queue),
        subscribe   : make(chan *Queue),
        unsubscribe : make(chan *Queue),
    }
    ws := &WebSocket {
        upgrader: websocket.Upgrader {ReadBufferSize:  1024, WriteBufferSize: 1024,},
        hub: h,
    }
    h.WebSocket(ws)
    h.AttachEvents(WSEventNetwork)
    go h.Queue()
    return ws
}

func (ws *WebSocket) Handler(w http.ResponseWriter, r *http.Request) {
    c, err := ws.upgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println("Failed to set websocket upgrade:", err)
    } else {
        h := ws.hub
        s := &Session{send: make(chan []byte, 256), cid: 0, connection: c, hub: h}
        q := &Queue{session: s, object: c}
        defer func() {
            h.unregister <- q
            c.Close()
        }()
        h.register <- q
        go s.write()
        s.config()
        s.read()
    }
}

func (ws *WebSocket) Bind(app *App) {
    app.Engine.GET("/sync", func(c *gin.Context) {
        ws.Handler(c.Writer, c.Request)
    });
}

