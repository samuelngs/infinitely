package ws

type Agent struct {
    // Registered connections.
	connections map[*Connection]bool
	// Inbound messages from the connections.
	broadcast chan []byte
	// Register requests from the connections.
	register chan *Connection
	// Unregister requests from connections.
	unregister chan *Connection
}

var ag = Agent {
    broadcast:   make(chan []byte),
	register:    make(chan *Connection),
	unregister:  make(chan *Connection),
	connections: make(map[*Connection]bool),
}

func (ag *Agent) run() {
	for {
		select {
		case c := <-ag.register:
			ag.connections[c] = true
		case c := <-ag.unregister:
			if _, ok := ag.connections[c]; ok {
				delete(ag.connections, c)
				close(c.send)
			}
		case m := <-ag.broadcast:
			for c := range ag.connections {
				select {
				case c.send <- m:
				default:
					close(c.send)
					delete(ag.connections, c)
				}
			}
		}
	}
}
