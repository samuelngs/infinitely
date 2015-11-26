
;(function() {

    var global = this;

    var WebSocket = function WebSocket(url) {
        App.Core.Base.call(this);
        this.set('ws', new global.WebSocket(url));
        this._listen();
    };

    WebSocket.prototype = Object.create(App.Core.Base.prototype);
    WebSocket.prototype.constructor = WebSocket;

    WebSocket.prototype._listen = function() {
        this.get('ws').addEventListener('open', this._onopen.bind(this));
        this.get('ws').addEventListener('close', this._onclose.bind(this));
        this.get('ws').addEventListener('message', this._onmessage.bind(this));
    };

    WebSocket.prototype._onopen = function() {
        this.set('cid', 0);
        this.set('connected', true);
        this.emit('open');
    };

    WebSocket.prototype._onclose = function() {
        this.set('connected', false);
        this.emit('close');
    };

    WebSocket.prototype._onmessage = function(msg) {
        this.emit('message', msg);
    };

    WebSocket.prototype.send = function(msg) {
        this.set('cid', this.get('cid') + 1);
        var data = {
            cid: this.get('cid'),
            type: 'publish',
            data: {
                channel: '',
                data: msg
            }
        };
        this.get('ws').send(JSON.stringify(data));
    };

    App.Module.WebSocket = WebSocket;

}.call(this || window));

