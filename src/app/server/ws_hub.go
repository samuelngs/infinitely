package server

import (
    "github.com/gorilla/websocket"
)

type Queue struct {
    session     *Session
    object      interface{}
    args        interface{}
    callback    func(*Queue)
}

type Hub struct {
    // Websocket
    ws *WebSocket
    // Registered Events
    events map[string]*WebSocketEvent
    // Registered connections.
    connections map[*websocket.Conn]*Session
    // Registered channels
    channels map[string]*Channel
    // Inbound messages from the connections.
	broadcast chan *Queue
	// Register requests from the connections.
	register chan *Queue
	// Unregister requests from connections.
	unregister chan *Queue
	// Subscribe requests from the connections.
	subscribe chan *Queue
	// Unregister requests from connections.
	unsubscribe chan *Queue
}

func (h *Hub) WebSocket(ws *WebSocket) {
    h.ws = ws
}

func (h *Hub) AttachEvents(args ...*WebSocketEvent) {
    for _, e := range args {
        h.events[e.name] = e
    }
}

func (h *Hub) Queue() {
    if h.ws == nil {
        panic("WebSocket server is not attached")
    }
    for {
        select {
        case q := <-h.register:
            if c, ok := q.object.(*websocket.Conn); ok {
                if s := h.connections[c]; s == nil {
                    h.connections[c] = q.session
                }
            }
        case q := <-h.unregister:
            if c, ok := q.object.(*websocket.Conn); ok {
                if s := h.connections[c]; s != nil {
                    close(s.send)
                    delete(h.connections, c)
                }
            }
        case q := <-h.subscribe:
            if m, ok := q.object.(*Message); ok {
                n := m.Data.Channel
                if e := h.events[n]; e != nil {
                    if err := e.Auth(q.session); err == nil {
                        r := &Queue{session: q.session, object: m}
                        if c := h.channels[n]; c == nil {
                            c = &Channel{
                                name    : n,
                                event   : e,
                                sessions: []*Session{},
                                queue   : make(chan *Queue),
                            }
                            go c.Queue()
                            h.channels[n] = c
                            c.queue <- r
                        } else {
                            c.queue <- r
                        }
                    }
                }
            }
        case q := <-h.unsubscribe:
            if m, ok := q.object.(*Message); ok {
                n := m.Data.Channel
                r := &Queue{session: q.session, object: m, args: h.channels}
                if c := h.channels[n]; c != nil {
                    c.queue <- r
                }
            }
        case q := <-h.broadcast:
            if m, ok := q.object.(*Message); ok {
                n := m.Data.Channel
                if len(n) > 0 {
                    if c := h.channels[n]; c != nil {
                        r := &Queue{session: q.session, object: m}
                        c.queue <- r
                    }
                }
            }
        }
    }
}

