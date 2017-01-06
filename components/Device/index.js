
import Inferno from 'inferno';

import styles from './styles.css';

const defaults = {
  className: '',
  bg: '#fff',
};

export default ({ children, className = defaults.className, bg = defaults.bg }) => <div className={`${styles.root} ${className}`}>
  <div className={styles.sleep} />
  <div className={styles.volume} />
  <div className={styles.camera} />
  <div className={styles.sensor} />
  <div className={styles.speaker} />
  <div className={styles.screen} style={{ backgroundColor: bg }}>{ children }</div>
  <div className={styles.home} />
</div>
