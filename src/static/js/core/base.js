
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

    Base.prototype.append = function(key, value) {
        if (!this.is(Base)) return;
        if (typeof key === 'string' && typeof value !== 'undefined') {
            if (typeof this.attributes[key] === 'string' || typeof this.attributes[key] === 'number') {
                this.attributes[key] += value;
            } else if (typeof s.attributes[key] === 'object' && this.attributes[key] instanceof Array) {
                this.attributes[key].push(value);
            } else {
                this.attributes[key] = value;
            }
        }
        return this.attributes[key];
    };

    Base.prototype.log = function(str) {
        var args;
        if ((typeof str === 'string' && str.indexOf('{0}') == -1) || (typeof str !== 'string')) {
            args = ['[' + this.constructor.name + ']'];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            console.log(args.join(''));
        } else if (typeof str === 'string' && str.indexOf('{0}') > -1) {
            args = arguments;
            str = str.replace(/\{([0-9]+)\}/g, function (match, index) {
                return args[parseInt(index) + 1];
            });
            console.log('[' + this.constructor.name + ']', str);
        }
        return this;
    };

    Base.prototype.throw = function(str) {
        var args;
        if ((typeof str === 'string' && str.indexOf('{0}') == -1) || (typeof str !== 'string')) {
            args = ['[' + this.constructor.name + ']'];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            throw args.join(' ');
        } else if (typeof str === 'string' && str.indexOf('{0}') > -1) {
            args = arguments;
            str = str.replace(/\{([0-9]+)\}/g, function (match, index) {
                return args[parseInt(index) + 1];
            });
            throw ('[' + this.constructor.name + ']' + str);
        }
    };

    App.Core.Base = Base;

}.call(this || window));

