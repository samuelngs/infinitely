
;(function() {

    var View = function View(options) {
        'use strict';
        // Set options to an empty object if passed options is empty
        if (typeof options !== 'object') {
            options = {};
        }
        if (!(this instanceof View)) {
            return new View(options);
        }
        App.Core.Base.call(this);
        // Defined pre-default values
        this.attributes = {};
        // Clone options to attributes
        for (var i in options) {
            this.attributes[i] = options[i];
        }
        // Set intialized status
        this.set('initialized', false);
        // Self init
        this.patch();
        this.controller();
    };

    View.prototype = Object.create(App.Core.Base.prototype);
    View.prototype.constructor = View;

    View.prototype.id = function() {
        if (!(this instanceof View)) {
            View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
        }
        if (typeof this.get('_id') !== 'string' || (typeof this.get('_id') && this.get('_id').trim().length === 0)) {
            this.set('_id', Math.random().toString(36).substring(7));
        }
        return this.get('_id');
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

    View.prototype.autoconfig = function(element, isInit, context) {
        if (!(this instanceof View)) {
            View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
        }
        if (typeof this.unload === 'function') {
            context.onunload = this.unload.call(this);
        }
    };

    View.prototype.unload = function() {
        this.set('initialized', false);
    };

    App.Core.View = View;

}.call(this || window));

