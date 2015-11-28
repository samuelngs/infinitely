package server

var WSEventNetwork = CreateWebSocketEvent("network").AddAuth(func(s *Session) (error) {
    return nil
}).AddEvent("test", func(m *Message, s *Session) (error) {
    if j, err := m.Reply("testing"); err == nil {
        s.emit(1, j)
    }
    return nil
}).AddEvent("test2", func(m *Message, s *Session) (error) {
    return nil
})

