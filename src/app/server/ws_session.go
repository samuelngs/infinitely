package server

import (
    "time"

    "github.com/gorilla/websocket"
)

type Session struct {
    // The hub manager
    hub *Hub
    // The websocket connection.
    connection *websocket.Conn
    // Buffered channel of outbound messages.
    send chan []byte
    // cid (count sent msg)
    cid int
}

func (s *Session) config() {
    c := s.connection
    c.SetReadLimit(maxMessageSize)
    c.SetWriteDeadline(time.Now().Add(writeWait))
    c.SetReadDeadline(time.Now().Add(pongWait))
    c.SetPongHandler(func(string) error {
        c.SetReadDeadline(time.Now().Add(pongWait))
        return nil
    })
}

func (s *Session) read() {
    for {
        _, msg, err := s.connection.ReadMessage()
        if err != nil {
			break
		}
        if m, err := ParseMessage(msg); err == nil {
            q := &Queue{session: s, object: m}
            switch m.Event {
            case MSG_SUBSCRIBE:
                s.hub.subscribe <- q
            case MSG_UNSUBSCRIBE:
                s.hub.unsubscribe <- q
            default:
                s.hub.broadcast <- q
            }
        }
    }
}

func (s *Session) write() {
    t := time.NewTicker(pingPeriod)
    defer func() {
		t.Stop()
		s.connection.Close()
	}()
    for {
        select {
        case message, ok := <-s.send:
			if !ok {
				s.emit(websocket.CloseMessage, []byte{})
				return
			}
			if err := s.emit(websocket.TextMessage, message); err != nil {
				return
			}
		case <-t.C:
			if err := s.emit(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
    }
}

func (s *Session) emit(mt int, payload []byte) error {
    s.connection.SetWriteDeadline(time.Now().Add(writeWait))
	return s.connection.WriteMessage(mt, payload)
}

