
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
        return m('div', {
            config: this.autoconfig('onload', 'ondraw'),
            style : {
                width : (window.innerWidth  + 'px'),
                height: (window.innerHeight + 'px')
            }
        });
    };

    Home.prototype.onload = function(element, init, context) {
        this.body('view-home');
        this.bind(window, 'resize', this.onresize.bind(this));
        this.set('window.width', window.innerWidth);
        this.set('window.height', window.innerHeight);
        this.set('element.x', element.offsetLeft);
        this.set('element.y', element.offsetTop);
    };

    Home.prototype.unload = function(element, init, context) {
        this.unset('window.width');
        this.unset('window.height');
        this.unset('element.x');
        this.unset('element.y');
    };

    Home.prototype.onresize = function() {
        this.set('window.width', window.innerWidth);
        this.set('window.height', window.innerHeight);
        this.redraw();
    };

    Home.prototype.webgl = function() {
        try {
            var canvas = document.createElement( 'canvas' );
            return !!( window.WebGLRenderingContext && (
                canvas.getContext( 'webgl' ) ||
                canvas.getContext( 'experimental-webgl' ) )
            );
        } catch (e) {
            return false;
        }
    };

    Home.prototype.ondraw = function(element) {

        var camera    = new THREE.PerspectiveCamera(75, this.get('window.width') / this.get('window.height'), 1, 10000),
            scene     = new THREE.Scene(),
            renderer;

        if (this.webgl()) {
            renderer = new THREE.WebGLRenderer();
        } else {
            rendered = new THREE.CanvasRenderer();
        }

        var SEPARATION = 100,
            AMOUNTX = 30,
            AMOUNTY = 10;

        var mouseX = 0,
            mouseY = -230;

        camera.position.z = 1000;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(this.get('window.width'), this.get('window.height'));

        var particles = [],
            pi2       = Math.PI * 2;

        var particle,
            count = 0;

        var material  = new THREE.SpriteMaterial({
            color: 0xffffff
        });

        var render = function() {

            camera.position.x += ( mouseX - camera.position.x ) * 0.05;
            camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
            camera.lookAt( scene.position );

            var i = 0;

            for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

                for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                    particle = particles[ i++ ];
                    particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                        ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
                    particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
                        ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

                }

            }

            renderer.render( scene, camera );

            count += 0.1;
        };

        var animate = function() {
            requestAnimationFrame(animate);
            render();
        };

        var i = 0;

        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
            for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
                particle = particles[ i ++ ] = new THREE.Sprite( material );
                particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                scene.add(particle);
            }
        }

        element.appendChild(renderer.domElement);

        animate();

    };

    App.Render.Home = Home;

}.call(this || window));
