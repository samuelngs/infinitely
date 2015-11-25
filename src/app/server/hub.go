package server

import (
    "github.com/gorilla/websocket"
)

type Hub struct {
    // Registered connections.
    connections map[*websocket.Conn]*Session
}

func (s *Hub) Get(conn *websocket.Conn) *Session {
    return s.connections[conn]
}

func (s *Hub) Bind(conn *websocket.Conn) *Session {
    session := s.Get(conn)
    if session == nil {
        session = &Session {
            connection: conn,
        }
        s.connections[conn] = session
    }
    return session
}

func (s *Hub) UnBind(conn *websocket.Conn) *Hub {
    _session := s.Get(conn)
    if _session != nil {
        delete(s.connections, conn)
    }
    return s
}

func (s *Hub) Clear() *Hub {
    for k := range s.connections {
        delete(s.connections, k)
    }
    return s
}

func (s *Hub) Count() int {
    return len(s.connections)
}
