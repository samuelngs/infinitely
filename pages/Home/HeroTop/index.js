
import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'weave-router';

import Device from '../../../components/Device';

import video from '../../../assets/athena/videos/athena-iphone-login.mp4';
import cover from '../../../assets/athena/images/athena-iphone-login.png';
import styles from './styles.css';

const defaults = {
  string: '',
};

export default class HeroTop extends Component {

  state = {
    visible: false,
    pre: false,
    ready: false,
  }

  componentDidMount() {
    const { timeout = defaults.timeout } = this.props;
    if ( typeof window === 'undefined' ) {
      return false;
    }
    return this.timeout({ visible: true }, timeout, () => {
      this.timeout({ pre: true }, 1200, () => {
        this.timeout({ ready: true }, 100, () => {
          this.node && this.node.play();
        });
      });
    });
  }

  timeout(state = { }, ms = 500, fn) {
    return window.setTimeout(() => this.setState(state, () => {
      typeof fn === 'function' && fn();
    }), ms);
  }

  shouldComponentUpdate(props, { visible, pre, ready }) {
    if (
      this.state.visible !== visible ||
      this.state.pre     !== pre ||
      this.state.ready   !== ready
    ) {
      return true;
    }
    return false;
  }

  onClick() {
    const { router: { push } } = this.context;
    return push('/athena');
  }

  render() {
    const { bg = defaults.string } = this.props;
    const { visible, pre, ready } = this.state;
    return <div className={`${styles.root} ${ready ? styles.ready : defaults.string}`} style={bg && { backgroundColor: bg }} onClick={::this.onClick}>
      <Device className={styles.device} bg="#11192A">
        <video ref={n => this.node = n} width="320px" height="568px" preload="none" poster={cover} loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </Device>
      <div className={styles.c2} />
      <div className={styles.c1} />
      <div className={styles.c3} />
    </div>
  }

}

