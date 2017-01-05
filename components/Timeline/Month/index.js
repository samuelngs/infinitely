
import Inferno from 'inferno';
import Component from 'inferno-component';

import styles from './styles.css';

const defaults = {
  string: '',
};

export default class Month extends Component {

  render() {
    const { month, number } = this.props;
    return <div className={`${styles.root} ${number % 6 === 0 ? number === 6 ? styles.half : styles.full : defaults.string}`}>
      <div className={styles.line} />
      <div className={styles.month}>{ month.substring(0, 3) }</div>
    </div>
  }

}

