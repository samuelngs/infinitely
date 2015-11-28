package server

var WSEventNetwork = CreateWebSocketEvent("network").AddAuth(func(s *Session) (error) {
    return nil
}).AddEvent("ping", func(m *Message, s *Session) (error) {
    if j, err := m.Reply("pong"); err == nil {
        s.emit(1, j)
    } else {
        return err
    }
    return nil
}).AddEvent("test2", func(m *Message, s *Session) (error) {
    return nil
})

