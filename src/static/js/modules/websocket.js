
;(function() {

    var global = this;

    var WebSocket = function WebSocket(url) {
        App.Core.Base.call(this);
        this.ws = new global.WebSocket(url);
        this._listen();
    };

    WebSocket.prototype = Object.create(App.Core.Base.prototype);
    WebSocket.prototype.constructor = WebSocket;

    WebSocket.prototype._listen = function() {
        this.ws.addEventListener('open', this._onopen.bind(this));
        this.ws.addEventListener('close', this._onclose.bind(this));
        this.ws.addEventListener('message', this._onmessage.bind(this));
    };

    WebSocket.prototype._onopen = function() {
        this.emit('open');
    };

    WebSocket.prototype._onclose = function() {
        this.emit('open');
    };

    WebSocket.prototype._onmessage = function(msg) {
        this.emit('message', msg);
    };

    WebSocket.prototype.send = function(msg) {
        var data = {
            type: 'message',
            data: msg
        };
        this.ws.send(JSON.stringify(data));
    };

    App.Module.WebSocket = WebSocket;

}.call(this || window));

