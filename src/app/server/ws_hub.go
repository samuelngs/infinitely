package server

import (
    "github.com/gorilla/websocket"
)

type Hub struct {
    // Registered connections.
    connections map[*websocket.Conn]*Session
    // Registered channels
    channels map[string]*Channel
}

func (h *Hub) Get(conn *websocket.Conn) *Session {
    return h.connections[conn]
}

func (h *Hub) Bind(conn *websocket.Conn) *Session {
    session := h.Get(conn)
    if session == nil {
        session = &Session {
            connection: conn,
        }
        h.connections[conn] = session
    }
    return session
}

func (h *Hub) UnBind(conn *websocket.Conn) *Hub {
    _session := h.Get(conn)
    if _session != nil {
        delete(h.connections, conn)
    }
    return h
}

func (h *Hub) Clear() *Hub {
    for k := range h.connections {
        delete(h.connections, k)
    }
    return h
}

func (h *Hub) Count() int {
    return len(h.connections)
}

func (h *Hub) ChannelsCount() int {
    return len(h.channels)
}

func (h *Hub) Subscribe(name string, s *Session) *Channel {
    c := h.channels[name]
    if c == nil {
        c = &Channel{
            []*Session {s},
        }
    }
    c.Subscribe(s)
    return c
}

func (h *Hub) Unsubscribe(name string, s *Session) bool {
    c := h.channels[name]
    if c == nil {
        return true
    } else {
        return c.Unsubscribe(s)
    }
    return false
}

