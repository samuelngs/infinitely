
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';

import GooEffect from '../../../components/GooEffect';
import BlobEffect from '../../../components/BlobEffect';

import styles from './styles.css';

const defaults = {
  string : '',
  effect : 'random',
  timeout: 1500,
};

export default class HeroMain extends Component {

  state = {
    visible: false,
    random : Math.round(Math.random()),
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

  render() {
    const { bg = defaults.string, effect = defaults.effect } = this.props;
    const { title, subtitle } = this.props;
    const { visible, random } = this.state;
    return <div className={styles.root} style={bg && { backgroundColor: bg }}>
      <div className={styles.title}>
        <h1 className={`${styles.defaults} ${visible ? styles.visible : defaults.string}`}>{ title }</h1>
      </div>
      <div className={styles.subtitle}>
        <h2 className={`${styles.defaults} ${visible ? styles.visible : defaults.string}`}>{ subtitle }</h2>
      </div>
      <div className={`${styles.separator} ${visible ? styles.visible : defaults.string}`}><div /></div>
      { ((effect === 'random' && random) || effect === 'blob') ? <BlobEffect timeout={2000} /> : <GooEffect timeout={2000} /> }
    </div>
  }

}

