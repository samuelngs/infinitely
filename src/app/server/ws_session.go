package server

import (
    "fmt"
    "time"
    "errors"

    "github.com/gorilla/websocket"
)

type Session struct {
    // hub
    hub *Hub
    // The websocket connection.
    connection *websocket.Conn
    // cid (count sent msg)
    cid int
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
        t, json, err := s.connection.ReadMessage()
        if err != nil {
            break
        }
        m, err := ParseMessage(json)
        if err != nil {
            s.WriteMessage(t, ErrorMessage(err))
        } else {
            switch m.Event {
            case MSG_PUBLISH:
                name := m.Data.Channel
                l := len(name)
                r := s.hub.IsSubscribed(name, s)
                if l > 0 && r {
                    s.WriteMessage(t, m)
                    c := s.hub.Channel(name)
                    c.Broadcast(t, m, s)
                }
            case MSG_SUBSCRIBE:
                name := m.Data.Channel
                l := len(name)
                if l > 0 {
                    s.hub.Subscribe(name, s)
                }
            case MSG_UNSUBSCRIBE:
                name := m.Data.Channel
                l := len(name)
                if l > 0 {
                    s.hub.Unsubscribe(name, s)
                }
            }
        }
    }
}

func (s *Session) WriteMessage(messageType int, m *Message) error {
    defer func() error {
        return errors.New("failed to send message")
    }()
    if m == nil {
        return errors.New("message is empty")
    }
    s.connection.SetWriteDeadline(time.Now().Add(writeWait))
    s.cid += 1
    m.Cid = s.cid
    m.Event = MSG_PUBLISH
    j, err := m.toJSON();
    if err != nil {
        return err
    }
    return s.connection.WriteMessage(messageType, j)
}

