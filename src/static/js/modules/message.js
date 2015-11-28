

;(function() {

    var global = this;

    // Regular Message Class

    var Message = function Message(options) {
        return App.Core.Base.call(this, options);
    };

    Message.Type = {
        TextMessage: 1,
        // BinaryMessage denotes a binary data message.
        BinaryMessage: 2,
        // CloseMessage denotes a close control message. The optional message
        // payload contains a numeric code and text. Use the FormatCloseMessage
        // function to format a close message payload.
        CloseMessage: 8,
        // PingMessage denotes a ping control message. The optional message payload
        // is UTF-8 encoded text.
        PingMessage: 9,
        // PongMessage denotes a ping control message. The optional message payload
        // is UTF-8 encoded text.
        PongMessage: 10
    };

    Message.prototype = Object.create(App.Core.Base.prototype);
    Message.prototype.constructor = Message;

    Message.prototype.setEvent = function(event) {
        this.set('event', event);
    };

    Message.prototype.setCID = function(cid) {
        if (typeof cid === 'string') {
            cid = parseInt(cid);
        }
        if (typeof cid !== 'number') {
            cid = 0;
        }
        this.set('cid', cid);
        return this;
    };

    Message.prototype.setType = function(type) {
        switch(type) {
            case Message.Type.TextMessage:
            case Message.Type.BinaryMessage:
            case Message.Type.CloseMessage:
            case Message.Type.PingMessage:
            case Message.Type.PongMessage:
                this.set('type', type);
                break;
            default:
                this.set('type', Message.Type.TextMessage);
                break;
        }
        return this;
    };

    Message.prototype.setChannel = function(channel) {
        if (typeof channel === 'string') {
            this.set('channel', channel);
        }
        return this;
    };

    Message.prototype.setData = function(data) {
        if (typeof data !== 'undefined') {
            this.set('data', data);
        }
        return this;
    };

    Message.prototype.toPacket = function() {
        return {
            type: this.get('type') || Message.Type.TextMessage,
            data: this.toJSON()
        };
    };

    Message.prototype.toJSON = function() {
        var obj = {
            cid     : this.get('cid') || 0,
            event   : this.get('event') || 'publish',
            data    : {}
        };
        if (typeof this.get('data') !== 'undefined') {
            obj.data.data = this.get('data');
        }
        if (typeof this.get('channel') == 'string') {
            obj.data.channel = this.get('channel');
        }
        return JSON.stringify(obj);
    };

    App.Module.Message = Message;

    // Channel Message Class

    var ChannelMessage = function ChannelMessage(options) {
        return App.Module.Message.call(this, options);
    };

    ChannelMessage.Type = Message.Type;

    ChannelMessage.prototype = Object.create(App.Module.Message.prototype);
    ChannelMessage.prototype.constructor = ChannelMessage;

    ChannelMessage.prototype.setCommand = function(command) {
        if (typeof command === 'string') {
            this.set('command', command);
        }
        return this;
    };

    ChannelMessage.prototype.toJSON = function() {
        var obj = {
            cid     : this.get('cid') || 0,
            event   : this.get('event') || 'publish',
            data    : {}
        };
        if (typeof this.get('channel') == 'string') {
            obj.data.channel = this.get('channel');
        }
        if (typeof this.get('command') == 'string') {
            obj.data.event = this.get('command');
        }
        if (typeof this.get('data') !== 'undefined') {
            obj.data.data = this.get('data');
        }
        return JSON.stringify(obj);
    };

    App.Module.ChannelMessage = ChannelMessage;

}.call(this || window));
