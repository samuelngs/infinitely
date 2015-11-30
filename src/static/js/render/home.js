
;(function() {

    var Home = function Home(options) {
        App.Core.View.call(this, options);
    };

    Home.prototype = Object.create(App.Core.View.prototype);
    Home.prototype.constructor = Home;

    Home.prototype.controller = function(opts) {
        if (!this.get('initialized')) {
            // Set item status as initialized
            this.set('initialized', true);
            // Patch component object
            this.component(opts);
        }
    };

    Home.prototype.view = function() {
        return m('canvas', {
            config: this.autoconfig('onload', 'draw')
        });
    };

    Home.prototype.onload = function(element, init, context) {
        window.addEventListener('resize', this.onresize.bind(this));
        this.set('window.width', window.innerWidth);
        this.set('window.height', window.innerHeight);
        this.set('element.x', element.offsetLeft);
        this.set('element.y', element.offsetTop);
    };

    Home.prototype.unload = function(element, init, context) {
        window.removeEventListener('resize', this.onresize.bind(this));
        this.unset('window.width');
        this.unset('window.height');
        this.unset('element.x');
        this.unset('element.y');
    };

    Home.prototype.onresize = function() {
        this.set('window.width', window.innerWidth);
        this.set('window.height', window.innerHeight);
        this.immediate(m.redraw);
    };

    Home.prototype.draw = function(element, init, context) {
        this.interval('draw', function() {
            var w = this.get('window.width'),
                h = this.get('window.height'),
                x = this.get('element.x'),
                y = this.get('element.y');
            console.log(w, h, y, x);
        }.bind(this), 1033);
    };

    App.Render.Home = Home;

}.call(this || window));
