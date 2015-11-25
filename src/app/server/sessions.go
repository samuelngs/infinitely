package server

import (
    "github.com/gorilla/websocket"
)

type Sessions struct {
    // Registered connections.
	connections map[*websocket.Conn]*Session
}

func CreateSessionsDB() *Sessions {
    return &Sessions {
        map[*websocket.Conn]*Session {},
    }
}

func (s *Sessions) Get(conn *websocket.Conn) *Session {
    return s.connections[conn]
}

func (s *Sessions) Bind(conn *websocket.Conn) *Session {
    session := s.Get(conn)
    if session == nil {
        session = &Session {
            connection: conn,
        }
        s.connections[conn] = session
    }
    return session
}

func (s *Sessions) UnBind(conn *websocket.Conn) *Sessions {
    _session := s.Get(conn)
    if _session != nil {
        delete(s.connections, conn)
    }
    return s
}

func (s *Sessions) Clear() *Sessions {
    for k := range s.connections {
        delete(s.connections, k)
    }
    return s
}

func (s *Sessions) Count() int {
    return len(s.connections)
}
