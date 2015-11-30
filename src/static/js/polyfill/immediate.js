;(function() {
    if (window.setImmediate) {
        return true;
    }
    var nextHandle = 1, tasksByHandle = {}, currentlyRunningATask = false, doc = window.document, setImmediate;
    function addFromSetImmediateArguments(args) {
        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
        return nextHandle++;
    }
    function partiallyApplied(handler) {
        var args = [].slice.call(arguments, 1);
        return function() { if (typeof handler === 'function') { handler.apply(undefined, args); } else { (new Function('' + handler))(); } };
    }
    function runIfPresent(handle) {
        if (currentlyRunningATask) {
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try { task(); } finally { clearImmediate(handle); currentlyRunningATask = false; }
            }
        }
    }
    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }
    function installNextTickImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            process.nextTick(partiallyApplied(runIfPresent, handle));
            return handle;
        };
    }
    function canUsePostMessage() {
        if (window.postMessage && !window.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = window.onmessage;
            window.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            window.postMessage('', '*');
            window.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }
    function installPostMessageImplementation() {
        var messagePrefix = 'setImmediate$' + Math.random() + '$';
        var onwindowMessage = function(event) {
            if (event.source === window &&
                typeof event.data === 'string' &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };
        if (window.addEventListener) {
            window.addEventListener('message', onwindowMessage, false);
        } else {
            window.attachEvent('onmessage', onwindowMessage);
        }
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            window.postMessage(messagePrefix + handle, '*');
            return handle;
        };
    }
    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }
    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            var script = doc.createElement('script');
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
    }
    function installSetTimeoutImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
            return handle;
        };
    }
    if ({}.toString.call(window.process) === '[object process]') {
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        installPostMessageImplementation();
    } else if (window.MessageChannel) {
        installMessageChannelImplementation();
    } else if (doc && 'onreadystatechange' in doc.createElement('script')) {
        installReadyStateChangeImplementation();
    } else {
        installSetTimeoutImplementation();
    }
    Window.prototype.setImmediate = setImmediate;
    Window.prototype.clearImmediate = clearImmediate;
})();
