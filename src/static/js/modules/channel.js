
;(function() {

    var global = this;

    var WSChannel = function WSChannel(options) {
        App.Core.Base.call(this, options);
        this.set('subscribed', false);
    };

    WSChannel.Type = {
        SUBSCRIBE   : 'subscribe',
        UNSUBSCRIBE : 'unsubscribe'
    };

    WSChannel.prototype = Object.create(App.Core.Base.prototype);
    WSChannel.prototype.constructor = WebSocket;

    WSChannel.prototype.setWebSocket = function(ws) {
        if (typeof ws === 'object' && ws instanceof App.Module.WebSocket) {
            this.set('ws', ws);
        } else {
            this.log('invalid websocket instance');
        }
        return this;
    };

    WSChannel.prototype.setName = function(channel) {
        if (typeof channel === 'string') {
            if (typeof this.get('id') !== 'string') {
                this.set('id', channel);
            } else {
                this.log('channel name cannot be changed once it\'s set');
            }
        } else {
            this.log('invalid channel name');
        }
        return this;
    };

    WSChannel.prototype.send = function(command, data, callback) {
        if (!this.get('ws')) {
            return this.log('could not find websocket client');
        }
        if (!this.get('subscribed')) {
            return this.log('you cannnot send any messages until you connected to channel');
        }
        if (typeof this.get('id') !== 'string') {
            return this.log('it requires channel name to send the message');
        }
        if (typeof command !== 'string') {
            return this.log('a message packet requires a command action');
        }
        var ws = this.get('ws');
        var channel = this.get('id');
        // increase cid
        var cid = ws.append('cid', 1);
        // create message
        var msg = new App.Module.ChannelMessage();
        // set properties
        msg.setCID(cid);
        msg.setCommand(command);
        msg.setChannel(channel);
        msg.setData(data);
        // send message
        ws.get('ws').send(msg.toJSON());
        // apply callback if available
        if (typeof callback === 'function') {
            ws.get('callbacks')[cid] = callback;
        }
    };

    WSChannel.prototype.subscribe = function(callback) {
        if (!this.get('ws')) {
            return this.log('could not find websocket client');
        }
        var ws = this.get('ws');
        var channel = this.get('id');
        // increase cid
        var cid = ws.append('cid', 1);
        // create message
        var msg = new App.Module.Message();
        msg.setCID(cid);
        msg.setEvent(WSChannel.Type.SUBSCRIBE);
        msg.setChannel(channel);
        // send message
        ws.get('ws').send(msg.toJSON());
        // callback if available
        ws.get('callbacks')[cid] = function(msg, complete) {
            var status = msg.data.data.subscribed;
            this.set('subscribed', status);
            if (typeof callback === 'function') {
                callback.call(this, msg, complete);
            }
        }.bind(this);
    };

    WSChannel.prototype.unsubscribe = function(callback) {
        if (!this.get('ws')) {
            return this.log('could not find websocket client');
        }
        var ws = this.get('ws');
        var channel = this.get('id');
        // increase cid
        var cid = ws.append('cid', 1);
        // create message
        var msg = new App.Module.Message();
        msg.setCID(cid);
        msg.setEvent(WSChannel.Type.UNSUBSCRIBE);
        msg.setChannel(channel);
        // send message
        ws.get('ws').send(msg.toJSON());
        // callback if available
        ws.get('callbacks')[cid] = function(msg, complete) {
            var status = msg.data.data.subscribed;
            this.set('subscribed', status);
            if (typeof callback === 'function') {
                callback.call(this, msg, complete);
            }
        }.bind(this);
    };

    App.Module.WSChannel = WSChannel;

}.call(this || window));
