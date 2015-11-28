
;(function() {

    var global = this;

    var WebSocket = function WebSocket(url, options) {
        App.Core.Base.call(this, options);
        this.set('ws', new global.WebSocket(url));
        this.set('connected', false);
        this.set('channels', {});
        this.set('callbacks', {});
        this._listen();
    };

    WebSocket.Message = App.Module.Message;
    WebSocket.Channel = App.Module.WSChannel;

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
        // object to return (obj or string)
        var obj,
        // get callbacks
            cbs = this.get('callbacks'),
        // get list of channels
            chs = this.get('channels'),
        // true if it's channel message
            isChannel = false;
        try {
            obj = JSON.parse(msg);
            if (typeof obj === 'object') {
                if (typeof obj.rid === 'number' && typeof cbs[obj.rid] === 'function') {
                    cbs[obj.rid].call(this, obj);
                    delete cbs[obj.rid];
                }
                if (typeof obj.data === 'object' && typeof obj.data.channel === 'string' && typeof chs[obj.data.channel] === 'object' && chs[obj.data.channel] instanceof App.Module.WSChannel) {
                    isChannel = true;
                    chs[obj.data.channel].emit('message', obj);
                }
            }
        } catch (e) {
            obj = msg;
        }
        if (!isChannel) {
            this.emit('message', obj);
        }
    };

    WebSocket.prototype.send = function(data, callback) {
        // increase cid
        this.append('cid', 1);
        // create message
        var msg = new WebSocket.Message();
        msg.setCID(this.get('cid'));
        msg.setData(data);
        // send message
        this.get('ws').send(msg.toJSON());
        // callback if available
        if (typeof callback === 'function') {
            this.get('callbacks')[this.get('cid')] = callback;
        }
    };

    WebSocket.prototype.subscribe = function(name, callback) {
        var channel;
        if (typeof name !== 'string') {
            return this.log('please provide the name of the channel');
        }
        if (typeof this.get('channels')[name] === 'object') {
            channel = this.get('channels')[name];
        } else {
            channel = new WebSocket.Channel();
            channel.setWebSocket(this);
            channel.setName(name);
            this.get('channels')[name] = channel;
        }
        channel.subscribe();
    };

    WebSocket.prototype.unsubscribe = function(name, callback) {
        var channel;
        if (typeof name !== 'string') {
            return this.log('please provide the name of the channel');
        }
        if (typeof this.get('channels')[name] === 'object') {
            channel = this.get('channels')[name];
            channel.unsubscribe();
        } else {
            this.log('channel [{0}] does not exist', name);
        }
    };

    WebSocket.prototype.channel = function(name) {
        var channel;
        if (typeof name !== 'string') {
            return this.log('please provide the name of the channel');
        }
        if (typeof this.get('channels')[name] === 'object') {
            channel = this.get('channels')[name];
            return channel;
        } else {
            this.throw('channel [{0}] cannot be found', name);
        }
    };

    App.Module.WebSocket = WebSocket;

}.call(this || window));

