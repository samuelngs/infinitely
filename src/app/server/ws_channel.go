package server

import (
    "fmt"
)

type Channel struct {
    // Channel name
    name string
    // Channel registered events
    event *WebSocketEvent
    // Sessions list
    sessions []*Session
	// Subscribe requests from the connections.
	queue chan *Queue
}

func (c *Channel) Queue() {
    for {
        select {
        case q := <-c.queue:
            if m, ok := q.object.(*Message); ok {
                switch m.Event {
                case MSG_SUBSCRIBE:
                    if success := c.subscribe(q.session); success {
                        if j, err := m.Reply(true); err == nil {
                            q.session.emit(TextMessage, j)
                        }
                    } else {
                        if j, err := m.Reply(false); err == nil {
                            q.session.emit(TextMessage, j)
                        }
                    }
                case MSG_UNSUBSCRIBE:
                    if success := c.unsubscribe(q.session); success {
                        if j, err := m.Reply(true); err == nil {
                            q.session.emit(TextMessage, j)
                        }
                    } else {
                        if j, err := m.Reply(false); err == nil {
                            q.session.emit(TextMessage, j)
                        }
                    }
                    if rm := len(c.sessions) == 0; rm {
                        if h, ok:= q.args.(*Hub); ok {
                            delete(h.channels, c.name)
                        }
                    }
                case MSG_PUBLISH:
                    if err := c.event.Run(m.Data.Event, m, q.session); err != nil {
                        fmt.Println(err.Error())
                    }
                default:
                }
            }
        }
    }
}

func (c *Channel) subscribe(s *Session) bool {
    if t := c.isSubscribed(s); !t {
        c.sessions = append(c.sessions, s)
        return true
    }
    return false
}

func (c *Channel) unsubscribe(s *Session) bool {
    for i, _s := range c.sessions {
		if _s == s {
			c.sessions = append(c.sessions[:i], c.sessions[i+1:]...)
            return true
		}
	}
    return false
}

func (c *Channel) isSubscribed(s *Session) bool {
    l := c.sessions
    for _, _s := range l {
        if _s == s {
            return true
        }
    }
    return false
}
