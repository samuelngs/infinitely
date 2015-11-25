package server

import (
    "fmt"

    "github.com/gorilla/websocket"
)

var SessionStatus = map[int]string {
    0: "CONNECTED",
    1: "DISCONNECTED",
}

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
        if err != nil {
            break
        }
        fmt.Println("websocket", t, msg)
    }
}
