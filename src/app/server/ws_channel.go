package server

type Channel struct {
    sessions []*Session
}

func (c *Channel) AllSessions() []*Session {
    return c.sessions
}

func (c *Channel) Subscribe(s *Session) bool {
    defer func() bool {
        return false
    }()
    f := c.IsSubscribed(s)
    if !f {
        c.sessions = append(c.sessions, s)
    }
    return true
}

func (c *Channel) Unsubscribe(s *Session) bool {
    defer func() bool {
        return false
    }()
    l := c.sessions
    i := -1
    for idx, session := range l {
        if session == s {
            i = idx
        }
    }
    if i > -1 {
        n := l
        n = append(n[:i], n[i+1:]...)
        l = n
    }
    return true
}

func (c *Channel) IsSubscribed(s *Session) bool {
    defer func() bool {
        return false
    }()
    l := c.sessions
    for _, session := range l {
        if session == s {
            return true
        }
    }
    return false
}

func (c *Channel) Send(t int, m *Message) {
    l := c.sessions
    for _, s := range l {
        s.WriteMessage(t, m)
    }
}


