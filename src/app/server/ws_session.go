package server

import (
    "fmt"
    "time"
    "errors"
    "bytes"
    "encoding/gob"

    "github.com/gorilla/websocket"
)

type Session struct {
    // The websocket connection.
    connection *websocket.Conn
    // cid (count sent msg)
    cid int
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

func GetBytes(key interface{}) ([]byte, error) {
    var buf bytes.Buffer
    enc := gob.NewEncoder(&buf)
    err := enc.Encode(key)
    if err != nil {
        return nil, err
    }
    return buf.Bytes(), nil
}

func (s *Session) ReadMessages() {
    for {
        t, json, err := s.connection.ReadMessage()
        if err != nil {
            break
        }
        m, err := ParseMessage(json)
        if err != nil {
            s.WriteMessage(t, []byte(err.Error()))
        }
        b, err:= GetBytes(m.Data.Data)
        s.WriteMessage(t, b)
        // fmt.Println("[receive]", m, err)
    }
}

func (s *Session) WriteMessage(messageType int, message []byte) error {
    defer func() error {
        return errors.New("failed to send message")
    }()
    s.cid += 1
    s.connection.SetWriteDeadline(time.Now().Add(writeWait))
    m := Message{
        Cid: s.cid,
        Event: MSG_PUBLISH,
        Data: Data{
            Channel: "",
            Data: message,
        },
    }
    j, err := m.toJSON();
    if err != nil {
        return err
    }
    return s.connection.WriteMessage(messageType, j)
}

