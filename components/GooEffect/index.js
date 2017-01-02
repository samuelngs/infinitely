
import Inferno from 'inferno';
import Component from 'inferno-component';

import styles from './styles.css';

const defaults = {
  string: '',
  number: 500,
};

export default class GooEffect extends Component {

  state = {
    visible: defaults.bool,
  }

  componentDidMount() {
    if ( typeof window === 'undefined' ) return false;
    const { timeout = defaults.number } = this.props;
    return window.setTimeout(
      () => this.setState({ visible: true }),
      timeout,
    );
  }

  render() {
    const { visible } = this.state;
    return <div className={styles.root}>
      <div className={`${styles.wave} ${visible ? styles.animated : defaults.string}`} />
      <div className={`${styles.wave} ${styles.two} ${visible ? styles.animated : defaults.string}`} />
      <div className={`${styles.wave} ${styles.three} ${visible ? styles.animated : defaults.string}`} />
    </div>
  }

}

