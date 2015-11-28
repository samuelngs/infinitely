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
                    c.subscribe(q.session)
                case MSG_UNSUBSCRIBE:
                    c.unsubscribe(q.session)
                    if rm := len(c.sessions) == 0; rm {
                        if h, ok:= q.args.(*Hub); ok {
                            delete(h.channels, c.name)
                        }
                    }
                case MSG_PUBLISH:
                    if err := c.event.Run(m.Data.Event, q.session); err != nil {
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
        fmt.Println("subscribe me")
        return true
    }
    return true
}

func (c *Channel) unsubscribe(s *Session) bool {
    for i, _s := range c.sessions {
		if _s == s {
			c.sessions = append(c.sessions[:i], c.sessions[i+1:]...)
            fmt.Println("unsubscribe me")
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
