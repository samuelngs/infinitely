
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

    WebSocket.prototype._incCID = function() {
        this.set('cid', this.get('cid') + 1);
    };

    WebSocket.prototype.send = function(channel, msg) {
        this._incCID();
        if (typeof channel === 'string' && typeof msg === 'undefined') {
            msg = channel;
            channel = '';
        }
        var data = {
            cid: this.get('cid'),
            event: 'publish',
            data: {
                channel: channel,
                data: msg
            }
        };
        this.get('ws').send(JSON.stringify(data));
    };

    WebSocket.prototype.subscribe = function(name, callback) {
        this._incCID();
        var data = {
            cid: this.get('cid'),
            event: 'subscribe',
            data: {
                channel: name
            }
        };
        this.get('ws').send(JSON.stringify(data));
    };

    App.Module.WebSocket = WebSocket;

}.call(this || window));

