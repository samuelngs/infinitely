package server

import (
    "fmt"
    "time"

    "github.com/gorilla/websocket"
)

type Session struct {
    // The websocket connection.
    connection *websocket.Conn
}

func NewSession(conn *websocket.Conn) *Session {
    return &Session {
        connection: conn,
    }
}

func (s *Session) Emit(messageType int, data []byte) bool {
    err := s.connection.WriteMessage(messageType, data)
    if err != nil {
        fmt.Println(err)
        return false
    }
    return true
}

func (s *Session) ReadMessages() {
    for {
        t, msg, err := s.connection.ReadMessage()
        m := string(msg[:])
        if err != nil {
            break
        }
        s.WriteMessage(t, msg)
        fmt.Println("[receive]", m)
    }
}

func (s *Session) WriteMessage(messageType int, message []byte) error {
    s.connection.SetWriteDeadline(time.Now().Add(writeWait))
    return s.connection.WriteMessage(messageType, message)
}

