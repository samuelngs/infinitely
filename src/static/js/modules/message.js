

;(function() {

    var global = this;

    var Message = function Message(data, options) {
        App.Core.Base.call(this);
        if (typeof data === 'object') {
            this.set('message', data);
        }
    };

    Message.Type = {
        TYPE_MESSAGE: "message",
        TYPE_CHANNEL: "channel",
        TYPE_PING: "ping",
        TYPE_PONG: "pong",
    };

    Message.prototype = Object.create(App.Core.Base.prototype);
    Message.prototype.constructor = Message;

    Message.prototype.toString = function() {
        var message = this.get('message'),
            type = this.get('type');
        return JSON.stringify();
    };

    App.Module.Message = Message;

}.call(this || window));
