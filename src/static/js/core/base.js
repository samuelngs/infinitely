
;(function() {

    var Base = function Base(options) {
        'use strict';
        EventEmitter.call(this);
        // Set options to an empty object if passed options is empty
        if (typeof options !== 'object') {
            options = {};
        }
        if (!(this instanceof Base)) {
            return new Base(options);
        }
        // Defined pre-default values
        this.attributes = {};
        // Clone options to attributes
        for (var i in options) {
            this.attributes[i] = options[i];
        }
    };

    Base.prototype = Object.create(EventEmitter.prototype);
    Base.prototype.constructor = Base;

    Base.prototype.is = function(_class, scope) {
        return (scope || this) instanceof (_class || this.constructor);
    };

    Base.prototype.get = function(key) {
        if (!this.is(Base)) return;
        if (typeof key === 'string') {
            return this.attributes[key];
        }
        return this.attributes;
    };

    Base.prototype.set = function(key, value) {
        if (!this.is(Base)) return;
        if (typeof key === 'string') {
            this.attributes[key] = value;
        }
        return this;
    };

    App.Core.Base = Base;

}.call(this || window));

