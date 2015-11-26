package server

import (
    "fmt"
    "errors"
    "encoding/json"
)

type Type int

const (
    MSG_PUBLISH Type = 1 + iota
    MSG_SUBSCRIBE
    MSG_UNSUBSCRIBE
    MSG_DISCONNECT
)

var types = [...]string {
    "publish",
    "subscribe",
    "unscribe",
    "disconnect",
}

func (t Type) String() string {
    return types[t - 1]
}

func (t Type) UnmarshalJSON(data []byte) error {
    s := string(data[:])
    fmt.Println(s)
    return nil
}

type Message struct {
    Cid  int `json:"cid"`
    Event Type `json:"event"`
    Data struct {
        Channel string `json:"channel"`
        Data    string `json:"data"`
    } `json:"data"`
}

func ParseMessage(t []byte) (*Message, error) {
    var m *Message
    if err := json.Unmarshal(t, &m); err != nil {
        return nil, err
    }
    if err := m.validate(); err != nil {
        return nil, err
    }
    return m, nil
}

func (m *Message) validate() error {
    switch m.Event {
    case MSG_PUBLISH, MSG_SUBSCRIBE, MSG_UNSUBSCRIBE, MSG_DISCONNECT:
    default:
        fmt.Println(m.Event)
        return errors.New("invalid message type")
    }
    return nil
}

