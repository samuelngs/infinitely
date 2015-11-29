package server

import(
    "fmt"
)

var WSEventNetwork = CreateWebSocketEvent("network").AddAuth(func(s *Session) (error) {
    // Anyone can subscribe this channel
    // return errors.New("you have no permission to subscribe this channel")
    return nil
}).AddEvent("ping", func(m *Message, c *Channel, s *Session) (error) {
    if j, err := m.Reply("pong"); err == nil {
        s.emit(1, j)
    } else {
        return err
    }
    return nil
}).AddEvent("yell", func(m *Message, c *Channel, s *Session) (error) {
    if j, err := m.Reply(m.Data.Data); err == nil {
        if err := c.emit(1, j, s); err != nil {
            fmt.Println(err.Error())
        }
    } else {
        return err
    }
    return nil
})
