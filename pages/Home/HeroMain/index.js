
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';

import Visibility from '../../../components/Visibility';
import GooEffect from '../../../components/GooEffect';
import BlobEffect from '../../../components/BlobEffect';

import styles from './styles.css';

const defaults = {
  string : '',
  timeout: 1500,
};

export default class HeroMain extends Component {

  state = {
    visible: false,
  }

  componentDidMount() {
    const { timeout = defaults.timeout } = this.props;
    if ( typeof window === 'undefined' ) {
      return false;
    }
    return window.setTimeout(() => {
      this.setState({ visible: true });
    }, timeout);
  }

  shouldComponentUpdate(props, { visible }) {
    const { visible: current } = this.state;
    return current !== visible;
  }

  render() {
    const { bg = defaults.string, effect = defaults.effect } = this.props;
    const { title, subtitle } = this.props;
    const { visible } = this.state;
    return <div className={styles.root} style={bg && { backgroundColor: bg }}>
      <div className={styles.title}>
        <h1 className={`${styles.defaults} ${visible ? styles.visible : defaults.string}`}>{ title }</h1>
      </div>
      <div className={styles.subtitle}>
        <h2 className={`${styles.defaults} ${visible ? styles.visible : defaults.string}`}>{ subtitle }</h2>
      </div>
      <div className={`${styles.separator} ${visible ? styles.visible : defaults.string}`}><div /></div>
      { false && <BlobEffect timeout={2000} /> }
    </div>
  }

}

