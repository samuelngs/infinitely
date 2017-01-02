
import Inferno from 'inferno';
import Component from 'inferno-component';

import styles from './styles.css';

const defaults = {
  string: '',
  number: 500,
  width : 500,
  height: 500,
  origin: { x: 500 / 2, y: 500 / 2 },
  colors: ['#44c1ff', '#6dffab', '#ffdd02'],
  fill  : '#c6e2e9',
};

class Dot {

  constructor() {
    this.x = defaults.origin.x;
    this.y = defaults.origin.y;
    this.angle = Math.PI * 2 * Math.random();
    this.vx = (1.6 + Math.random() * .3) * Math.cos(this.angle);
    this.vy = (1.6 + Math.random() * .3) * Math.sin(this.angle);
    this.r = 6 + 3 * Math.random();
    this.color = defaults.colors[Math.floor(Math.random() * defaults.colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.r -= .01;
  }

}

export default class BlobEffect extends Component {

  state = {
    visible: defaults.bool,
    count  : 0,
    random : 1,
    dots   : [ ],
  }

  canvas = {
    node: null,
    context: null,
  }

  constructor(props) {
    super(props);
    this.componentAnimate = this.componentAnimate.bind(this);
  }

  componentDidMount() {
    if ( typeof window === 'undefined' ) return false;
    const { timeout = defaults.number } = this.props;
    return window.setTimeout(
      () => this.setState({ visible: true }, this.componentAnimate),
      timeout,
    );
  }

  componentWillUnmount() {
    return this.setState({ visible: false });
  }

  componentAnimate() {
    const { visible } = this.state;
    if ( !visible ) return false;
    const { canvas: { node, context } } = this;
    if ( node && context ) {
      this.componentDrawCanvas(node, context);
    }
    if ( window.requestAnimationFrame ) {
      return window.requestAnimationFrame(this.componentAnimate);
    }
    return setImmediate(this.componentAnimate);
  }

  componentDrawCanvas(canvas, context) {
    context.clearRect(0, 0, defaults.width, defaults.height);
    if ( this.state.count === this.state.random ) {
      this.state.dots.push(new Dot());
      this.state.count = 0;
      this.state.random = 3 + Math.floor(Math.random() * 5);
    }
    this.state.count++;
    for ( const dot of this.state.dots ) {
      context.fillStyle = dot.color;
      context.beginPath();
      context.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2, false);
      context.fill();
      dot.update();
    }
    context.fillStyle = defaults.fill;
    context.beginPath();
    context.arc(defaults.origin.x, defaults.origin.y, 40, 0, Math.PI * 2, false);
    context.fill();
    for (var i = 0; i < this.state.dots.length; i++) {
      const dot = this.state.dots[i];
      if (
        dot.x + dot.r < 0 ||
        dot.x - dot.r > defaults.width ||
        dot.y + dot.r < 0 ||
        dot.y - dot.r > defaults.height ||
        dot.r < 0
      ) {
        this.state.dots.splice(i, 1);
      }
    }
  }

  render() {
    const { visible } = this.state;
    return <div className={`${styles.root} ${visible ? styles.visible : defaults.string}`}>
      { visible && <canvas className={styles.canvas} ref={n => {
        this.canvas.node = n;
        this.canvas.context = n && n.getContext('2d');
      }} width="500" height="500" /> }
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className={styles.svg}>
        <defs>
          <filter id="filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 80 -9" />
          </filter>
        </defs>
      </svg>
    </div>
  }

}

