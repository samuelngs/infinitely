package server

import (
    "fmt"
    "errors"
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
                    subscribed, success, err:= c.subscribe(q.session);
                    r := &Result{Name: m.Data.Channel, Subscribed: subscribed, Success: success}
                    if success {
                        q.session.channels = append(q.session.channels, c)
                    }
                    if err != nil {
                        r.Error = err.Error()
                    }
                    if j, err := m.Reply(r); err == nil {
                        q.session.emit(TextMessage, j)
                    }
                case MSG_UNSUBSCRIBE:
                    subscribed, success, err:= c.unsubscribe(q.session);
                    r := &Result{Name: m.Data.Channel, Subscribed: subscribed, Success: success}
                    if success {
                        for i, _c := range q.session.channels {
                            if _c == c {
                                q.session.channels = append(q.session.channels[:i], q.session.channels[i+1:]...)
                            }
                        }
                    }
                    if err != nil {
                        r.Error = err.Error()
                    }
                    if j, err := m.Reply(r); err == nil {
                        q.session.emit(TextMessage, j)
                    }
                    if rm := len(c.sessions) == 0; rm {
                        if h, ok:= q.args.(*Hub); ok {
                            delete(h.channels, c.name)
                        }
                    }
                case MSG_PUBLISH:
                    if err := c.event.Run(m.Data.Event, m, c, q.session); err != nil {
                        fmt.Println(err.Error())
                    }
                }
            }
        }
    }
}

/**
 * @return subscribed, success
 */
func (c *Channel) subscribe(s *Session) (bool, bool, error) {
    if t := c.isSubscribed(s); !t {
        c.sessions = append(c.sessions, s)
        return true, true, nil
    } else {
        return true, false, errors.New("channel was already subscribed")
    }
    return false, false, nil
}

/**
 * @return subscribed, success
 */
func (c *Channel) unsubscribe(s *Session) (bool, bool, error) {
    for i, _s := range c.sessions {
		if _s == s {
			c.sessions = append(c.sessions[:i], c.sessions[i+1:]...)
            return false, true, nil
		}
	}
    return false, false, errors.New("you are not subscribed to this channel")
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

func (c *Channel) emit(mt int, payload []byte, s *Session) error {
    for _, _s := range c.sessions {
        if _s != s {
            if err := _s.emit(mt, payload); err != nil {
                return err
            }
        }
    }
    return nil
}

