package server

import (
    "errors"
)

type WebSocketEvent struct {
    // Event name (name://action)
    name string
    // Authorize
    auth func(*Session) (error)
    // Registered events.
    events map[string]func(*Session) (error)
}

func CreateWebSocketEvent(t string) *WebSocketEvent {
    return &WebSocketEvent{
        name    : t,
        events  : make(map[string]func(*Session) (error)),
    }
}

func(e *WebSocketEvent) AddAuth(f func(*Session) (error)) *WebSocketEvent {
    if f != nil {
        e.auth = f
    }
    return e
}

func(e *WebSocketEvent) AddEvent(name string, f func(*Session) (error)) *WebSocketEvent {
    if e.events[name] == nil {
        e.events[name] = f
    } else {
        panic("event '" + name + "' is already existed")
    }
    return e
}

func(e *WebSocketEvent) Auth(s *Session) (error) {
    if e.auth == nil {
        return errors.New("Authorize Error")
    }
    return e.auth(s)
}

func(e *WebSocketEvent) Run(name string, s *Session) (error) {
    if e.events[name] != nil {
        return e.events[name](s)
    }
    return errors.New("event '" + name + "' does not exist")
}

