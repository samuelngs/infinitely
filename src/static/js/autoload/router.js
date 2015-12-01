
;(function() {

    var m = this.m;

    if (!m) return console.log('Mithril is not loaded');

    m.route.mode = 'pathname';

    m.route(document.body, '/', {
        '/': new App.Render.Home(),
    });

}.call(this || window));
