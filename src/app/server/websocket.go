
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
)

var upgrader = websocket.Upgrader {
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

type WebSocket struct {}

func (ws *WebSocket) Handler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println("Failed to set websocket upgrade:", err)
    } else {
        c := &Connection{send: make(chan []byte, 256), ws: conn}
        ag.register <- c
        go c.writePump()
        c.readPump()
    }
}

func (ws *WebSocket) Bind(app *App) {
    app.Engine.GET("/sync", func(c *gin.Context) {
        ws.Handler(c.Writer, c.Request)
    });
}

type Connection struct {
	// The websocket connection.
	ws *websocket.Conn
	// Buffered channel of outbound messages.
	send chan []byte
}

func (c *Connection) readPump() {
    defer func() {
		ag.unregister <- c
		c.ws.Close()
	}()
    c.ws.SetReadLimit(maxMessageSize)
	c.ws.SetReadDeadline(time.Now().Add(pongWait))
	c.ws.SetPongHandler(func(string) error { c.ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.ws.ReadMessage()
		if err != nil {
			break
		}
		ag.broadcast <- message
	}
}

func (c *Connection) write(mt int, payload []byte) error {
    c.ws.SetWriteDeadline(time.Now().Add(writeWait))
    return c.ws.WriteMessage(mt, payload)
}

func (c *Connection) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.ws.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				c.write(websocket.CloseMessage, []byte{})
				return
			}
			if err := c.write(websocket.TextMessage, message); err != nil {
				return
			}
		case <-ticker.C:
			if err := c.write(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

type Agent struct {
    // Registered connections.
	connections map[*Connection]bool
	// Inbound messages from the connections.
	broadcast chan []byte
	// Register requests from the connections.
	register chan *Connection
	// Unregister requests from connections.
	unregister chan *Connection
}

var ag = Agent {
    broadcast:   make(chan []byte),
	register:    make(chan *Connection),
	unregister:  make(chan *Connection),
	connections: make(map[*Connection]bool),
}

func (ag *Agent) run() {
	for {
		select {
		case c := <-ag.register:
			ag.connections[c] = true
		case c := <-ag.unregister:
			if _, ok := ag.connections[c]; ok {
				delete(ag.connections, c)
				close(c.send)
			}
		case m := <-ag.broadcast:
			for c := range ag.connections {
				select {
				case c.send <- m:
				default:
					close(c.send)
					delete(ag.connections, c)
				}
			}
		}
	}
}

