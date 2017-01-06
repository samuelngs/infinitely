
import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'weave-router';

import Device from '../../../components/Device';

import video from '../../../assets/athena/videos/athena-iphone-login.mp4';
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
        this.timeout({ ready: true }, 100);
      });
    });
  }

  timeout(state = { }, ms = 500, fn) {
    return window.setTimeout(() => this.setState(state, () => {
      typeof fn === 'function' && fn();
    }), ms);
  }

  shouldComponentUpdate(props, state) {
    if ( this.state.visible !== state.visible || this.state.pre !== state.pre || this.state.ready !== state.ready ) {
      return true;
    }
    return false;
  }

  render() {
    const { bg = defaults.string } = this.props;
    const { visible, pre, ready } = this.state;
    return <div className={`${styles.root} ${ready ? styles.ready : defaults.string}`} style={bg && { backgroundColor: bg }}>
      <Device className={styles.device} bg="#11192A">
        <video ref={n => this.node = n} width="320px" height="568px" preload="auto" autoplay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </Device>
      { pre && <div className={styles.c1} /> }
      { pre && <div className={styles.c2} /> }
      { pre && <div className={styles.c3} /> }
    </div>
  }

}

