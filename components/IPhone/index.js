
import Inferno from 'inferno';
import Component from 'inferno-component';

import styles from './styles.css';

const defaults = {
  string: '',
  bg: '#fff',
};

export default class IPhone extends Component {

  render({ children, className = defaults.string, bg = defaults.bg }) {
    return <div className={`${styles.root} ${className}`}>
      <div className={styles.screen} style={{ backgroundColor: bg }}>
        { children }
      </div>
    </div>
  }

}

