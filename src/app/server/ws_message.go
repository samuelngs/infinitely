package server

import (
    "bytes"
    "errors"
    "encoding/gob"
    "encoding/json"
)

type Type int

const (
    MSG_PUBLISH Type = iota
    MSG_SUBSCRIBE
    MSG_UNSUBSCRIBE
    MSG_DISCONNECT
    MSG_ERROR
)

var types = [...]string {
    "publish",
    "subscribe",
    "unsubscribe",
    "disconnect",
    "error",
}

func (t Type) String() string {
    return types[t]
}

func (t *Type) MarshalJSON() ([]byte, error) {
    return json.Marshal(t.String())
}

type Message struct {
    Cid  int `json:"cid,omitempty"`
    Event Type `json:"event"`
    Data Data `json:"data"`
}

type Data struct {
    Channel string `json:"channel,omitempt"`
    Data    interface{} `json:"data,omitempt"`
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

func ErrorMessage(e error) (*Message) {
    d := &Data{
        Data   : e.Error(),
    }
    m := &Message{
        Event: MSG_ERROR,
        Data : *d,
    }
    return m
}

func (m *Message) validate() error {
    switch m.Event {
    case MSG_PUBLISH, MSG_SUBSCRIBE, MSG_UNSUBSCRIBE, MSG_DISCONNECT, MSG_ERROR:
    default:
        return errors.New("invalid message type")
    }
    return nil
}

func (m *Message) toJSON() ([]byte, error) {
    o, err := json.Marshal(m)
    return o, err
}

func (m *Message) toBytes() ([]byte, error) {
    var buf bytes.Buffer
    enc := gob.NewEncoder(&buf)
    err := enc.Encode(m)
    if err != nil {
        return nil, err
    }
    return buf.Bytes(), nil
}


