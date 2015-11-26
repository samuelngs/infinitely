
(function() {

    var app = this;

    var WebSocket = function WebSocket(url) {
        this.ws = new WebSocket(url);
    };

    WebSocket.prototype = Object.create(global.App.Core.Base.prototype);
    WebSocket.prototype.constructor = WebSocket;

    global.App.Module.WebSocket = WebSocket;

}.call(this || window))

