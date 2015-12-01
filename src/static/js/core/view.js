
;(function() {

    var View = function View(options) {
        'use strict';
        if (!(this instanceof View)) {
            return new View(options);
        }
        App.Core.Base.call(this, options);
        // listeners registry
        this.set('_listeners', {});
        // Set intialized status
        this.set('initialized', false);
        // Self init
        this.patch();
        this.controller();
    };

    View.prototype = Object.create(App.Core.Base.prototype);
    View.prototype.constructor = View;

    View.prototype.get          = App.Core.Base.prototype.get;
    View.prototype.set          = App.Core.Base.prototype.set;
    View.prototype.unset        = App.Core.Base.prototype.unset;
    View.prototype.append       = App.Core.Base.prototype.append;
    View.prototype.timeout      = App.Core.Base.prototype.timeout;
    View.prototype.untimeout    = App.Core.Base.prototype.untimeout;
    View.prototype.interval     = App.Core.Base.prototype.interval;
    View.prototype.uninterval   = App.Core.Base.prototype.uninterval;
    View.prototype.immediate    = App.Core.Base.prototype.immediate;
    View.prototype.unimmediate  = App.Core.Base.prototype.unimmediate;

    View.prototype.id = function() {
        if (!(this instanceof View)) {
            View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
        }
        if (typeof this.get('_id') !== 'string' || (typeof this.get('_id') && this.get('_id').trim().length === 0)) {
            this.set('_id', Math.random().toString(36).substring(7));
        }
        return this.get('_id');
    };

    View.prototype.instance = function() {
        if (!(this instanceof View)) {
            View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
        }
        return this;
    };

    View.prototype.component = function(options) {
        if (typeof options !== 'object') {
            options = {};
        }
        for (var i in options) {
            this.attributes[i] = options[i];
        }
    };

    View.prototype.controller = function() {
        return this;
    };

    View.prototype.view = function() {
        return undefined;
    };

    View.prototype.patch = function() {
        var targets = [ 'controller', 'view' ],
            prototypes = Object.keys(View.prototype);
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            if (typeof this[target] === 'function') {
                for (var j = 0; j < prototypes.length; j++) {
                    this[target].prototype[prototypes[j]] = this[prototypes[j]].bind(this);
                }
            }
        }
    };

    View.prototype.autoconfig = function() {
        var args = arguments;
        return function(element, isInit, context) {
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (typeof this[arg] === 'function') {
                    this[arg].call(this, element, isInit, context);
                }
            }
            if (typeof this.unload === 'function') {
                context.onunload = this._unload.bind(this, element, isInit, context);
            }
        }.bind(this.instance());
    };

    View.prototype._unload = function() {
        if (this.get('initalized')) {
            this.set('initialized', false);
            this.unbind();
            this.untimeout();
            this.uninterval();
            this.unimmediate();
            if (typeof this.unload === 'function') {
                this.unload.call(this);
            }
        }
    };

    View.prototype.body = function() {
        var classes = ['view'];
        for (var i = 0; i < arguments.length; i++) {
            classes.push(arguments[i]);
        }
        document.body.className = classes.join(' ');
    };

    View.prototype.bind = function(el, event, func) {
        var id = Math.random().toString(36).substring(7);
        if (typeof el === 'object' && typeof event === 'string' && typeof func === 'function') {
            this.attributes._listeners[id] = {
                element : el,
                event   : event,
                callback: func
            };
            el.addEventListener(event, func);
            return id;
        } else {
            this.throw('please provide element, event, and callback');
        }
        return undefined;
    };

    View.prototype.unbind = function(id) {
        if (typeof id === 'string') {
            if (typeof this.attributes._listeners[id] === 'object' && typeof this.attributes._listeners[id].callback === 'function') {
                this.attributes._listeners[id].element.removeEventListener(this.attributes._listeners[id].event, this.attributes._listeners[id].callback);
                delete this.attributes._listeners[id];
            } else {
                this.log('listener is not registered or already been unregistered');
            }
        } else {
            var keys = Object.keys(this.attributes._listeners);
            for (var i = 0; i < keys.length; i++) {
                this.unbind(keys[i]);
            }
        }
    };

    View.prototype.redraw = function() {
        this.immediate('_redraw', m.redraw);
    };

    App.Core.View = View;

}.call(this || window));

