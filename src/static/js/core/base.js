
;(function() {

    var app = this;

    var Base = function Base(options) {
        'use strict';
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

    Base.is = function() {
        console.log('scope', this);
    };

    Base.prototype = Object.create(EventEmitter.prototype);
    Base.prototype.constructor = Base;

    Base.prototype.get = function(key) {
        Base.is();
        if (typeof key === 'string') {
            return this.attributes[key];
        }
        return this.attributes;
    };

    Base.prototype.set = function(key, value) {
        Base.is();
        if (typeof key === 'string') {
            this.attributes[key] = value;
        }
        return this;
    };

    global.App.Core.Base = Base;

}.call(this || window));

