
;(function() {

    var global = this;

    var WebSocket = function WebSocket(url, options) {
        App.Core.Base.call(this, options);
        this.set('url', url);
        this.set('connected', false);
        this.set('channels', {});
        this.set('callbacks', {});
        this._keepalive();
        this._create();
    };

    WebSocket.Message = App.Module.Message;
    WebSocket.Channel = App.Module.WSChannel;

    WebSocket.prototype = Object.create(App.Core.Base.prototype);
    WebSocket.prototype.constructor = WebSocket;

    WebSocket.prototype._keepalive = function() {
        setInterval(function() {
            if (!this.get('connected')) {
                this._create();
            }
        }.bind(this), 2500);
    };

    WebSocket.prototype._cleanup = function() {
        var ws = this.get('ws');
        if (typeof ws !== 'undefined' && ws instanceof global.WebSocket) {
            ws.removeEventListener('open', this._onopen.bind(this));
            ws.removeEventListener('close', this._onclose.bind(this));
            ws.removeEventListener('message', this._onmessage.bind(this));
            this.delete('ws');
        }
    };

    WebSocket.prototype._create = function() {
        var ws  = this.get('ws'),
            url = this.get('url');
        if (typeof url === 'string' && !this.get('connected')) {
            this._cleanup();
            this.set('ws', ws = new global.WebSocket(url));
            this._listen();
        }
    };

    WebSocket.prototype._listen = function() {
        var ws = this.get('ws');
        if (typeof ws !== 'undefined' && ws instanceof global.WebSocket) {
            ws.addEventListener('open', this._onopen.bind(this));
            ws.addEventListener('close', this._onclose.bind(this));
            ws.addEventListener('message', this._onmessage.bind(this));
        }
    };

    WebSocket.prototype._onopen = function() {
        this.set('cid', 0);
        this.set('connected', true);
        this.emit('open');
        this._resubscribe();
    };

    WebSocket.prototype._onclose = function() {
        this.set('connected', false);
        this.channels(false).map(function(channel) {
            channel.set('subscribed', false);
        });
        this.emit('close');
    };

    WebSocket.prototype._resubscribe = function() {
        this.channels(false).map(function(channel) {
            channel.subscribe();
        });
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
            obj = JSON.parse(msg.data);
            if (typeof obj === 'object') {
                if (typeof obj.rid === 'number' && typeof cbs[obj.rid] === 'function') {
                    var timeout;
                    var complete = function() {
                        clearTimeout(timeout);
                        delete cbs[obj.rid];
                    };
                    timeout = setTimeout(complete, 5000);
                    cbs[obj.rid].call(this, obj, complete);

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
        var cid = this.append('cid', 1);
        // create message
        var msg = new WebSocket.Message();
        msg.setCID(cid);
        msg.setData(data);
        // send message
        this.get('ws').send(msg.toJSON());
        // callback if available
        if (typeof callback === 'function') {
            this.get('callbacks')[cid] = callback;
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
        channel.subscribe(callback);
    };

    WebSocket.prototype.unsubscribe = function(name, callback) {
        var channel;
        if (typeof name !== 'string') {
            return this.log('please provide the name of the channel');
        }
        if (typeof this.get('channels')[name] === 'object') {
            channel = this.get('channels')[name];
            channel.unsubscribe(callback);
        } else {
            this.log('channel [{0}] does not exist', name);
        }
    };

    WebSocket.prototype.channel = function(name) {
        var channel;
        if (typeof name !== 'string' || (typeof name === 'string' && name.trim().length === 0)) {
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
        return channel;
    };

    WebSocket.prototype.channels = function(subscribed) {
        var list = this.get('channels'),
            keys = Object.keys(list),
            channels = [];
        if (typeof subscribed !== 'boolean') {
            subscribed = true;
        }
        for (var i = 0; i < keys.length; i++) {
            var channel = list[keys[i]];
            if (subscribed) {
                if (channel.get('subscribed') === true) {
                    channels.push(channel);
                }
            } else {
                channels.push(channel);
            }
        }
        return channels;
    };

    App.Module.WebSocket = WebSocket;

}.call(this || window));

