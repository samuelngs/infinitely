
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
        this.attributes = {
            _timeout  : {},
            _interval : {},
            _immediate: {}
        };
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
        if (typeof key === 'string') {
            return this.attributes[key];
        }
        return this.attributes;
    };

    Base.prototype.set = function(key, value) {
        if (typeof key === 'string') {
            this.attributes[key] = value;
        }
        return this;
    };

    Base.prototype.unset = function(key) {
        delete this.attributes[key];
    };

    Base.prototype.append = function(key, value) {
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

    Base.prototype.timeout = function(name, func, milliseconds) {
        if (typeof this.attributes._timeout[name] !== 'undefined') {
            this.untimeout(name);
        }
        if (typeof func === 'function') {
            if (typeof milliseconds === 'number') {
                this.attributes._timeout[name] = window.setTimeout(func, milliseconds);
            } else {
                this.attributes._timeout[name] = window.setTimeout(func, 0);
            }
        }
    };

    Base.prototype.untimeout = function(name) {
        if (typeof name === 'string') {
            if (typeof this.attributes._timeout[name] !== 'undefined') {
                window.clearTimeout(this.attributes._timeout[name]);
                delete this.attributes._timeout[name];
            }
        } else {
            var keys = Object.keys(this.attributes._timeout);
            for (var i = 0; i < keys.length; i++) {
                this.untimeout(keys[i]);
            }
        }
    };

    Base.prototype.immediate = function(name, func) {
        if (typeof name === 'string') {
            if (typeof this.attributes._immediate[name] !== 'undefined') {
                this.unimmediate(name);
            }
            if (typeof func === 'function') {
                this.attributes._interval[name] = window.setImmediate(function() {
                    func.call(this);
                    delete this.attributes._interval[name];
                }.bind(this));
            }
        }
    };

    Base.prototype.unimmediate = function(name) {
        if (typeof name === 'string') {
            if (typeof this.attributes._immediate[name] !== 'undefined') {
                window.clearImmediate(this.attributes._immediate[name]);
                delete this.attributes._immediate[name];
            }
        } else {
            var keys = Object.keys(this.attributes._immediate);
            for (var i = 0; i < keys.length; i++) {
                this.unimmediate(keys[i]);
            }
        }
    };

    Base.prototype.interval = function(name, func, milliseconds) {
        if (typeof name === 'string') {
            if (typeof this.attributes._interval[name] !== 'undefined') {
                this.uninterval(name);
            }
            if (typeof func === 'function') {
                if (typeof milliseconds === 'number') {
                    this.attributes._interval[name] = window.setInterval(func, milliseconds);
                } else {
                    this.attributes._interval[name] = window.setInterval(func, 0);
                }
            }
        }
    };

    Base.prototype.uninterval = function(name) {
        if (typeof name === 'string') {
            if (typeof this.attributes._interval[name] !== 'undefined') {
                window.clearInterval(this.attributes._interval[name]);
                delete this.attributes._interval[name];
            }
        } else {
            var keys = Object.keys(this.attributes._interval);
            for (var i = 0; i < keys.length; i++) {
                this.uninterval(keys[i]);
            }
        }
    };

    App.Core.Base = Base;

}.call(this || window));

