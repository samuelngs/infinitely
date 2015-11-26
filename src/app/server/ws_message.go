package server

import (
    "errors"
    "encoding/json"
)

type Type int

const (
    MSG_PUBLISH Type = iota
    MSG_SUBSCRIBE
    MSG_UNSUBSCRIBE
    MSG_DISCONNECT
)

var types = [...]string {
    "publish",
    "subscribe",
    "unsubscribe",
    "disconnect",
}

func (t Type) String() string {
    return types[t]
}

type Message struct {
    Cid  int `json:"cid,omitempty"`
    Event Type `json:"event,omitempty"`
    Data Data `json:"data"`
}

type Data struct {
    Channel string `json:"channel"`
    Data    interface{} `json:"data"`
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
        return errors.New("invalid message type")
    }
    return nil
}

func (m *Message) toJSON() ([]byte, error) {
    o, err := json.Marshal(m)
    return o, err
}


