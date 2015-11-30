
;(function() {

    var m = global.m;

    if (!m) return console.log('Mithril is not loaded');

    m.route(document.body, '/', {
        '/': App.Render.Home,
    });

}.call(this || window));
