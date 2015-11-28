package server

var WSEventNetwork = CreateWebSocketEvent("network").AddAuth(func(s *Session) (error) {
    return nil
}).AddEvent("test", func(s *Session) (error) {
    d := &Data{
        Data   : "lol",
    }
    m := &Message{
        Event: MSG_PUBLISH,
        Data : *d,
    }
    j, _ := m.toJSON()
    s.emit(1, j)
    return nil
}).AddEvent("test2", func(s *Session) (error) {
    return nil
})

