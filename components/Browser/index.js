
import Inferno from 'inferno';

import styles from './styles.css';

const defaults = {
  string: '',
  address: '',
  bg: '#fff',
};

export default ({ children, className = defaults.string, bg = defaults.bg, address = defaults.address }) => <div className={`${styles.root} ${className}`}>
  <div className={styles.header}>
    <div className={styles.group}>
      <div className={styles.controls} />
      <div className={`${styles.controls} ${styles.orange}`} />
      <div className={`${styles.controls} ${styles.green}`} />
    </div>
    <div className={styles.group}>
      <div className={styles.button}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path fill="#939393" d="M67.3 88.3L27 48 67 8.1l4.2 4.2L35.5 48l36 36"/>
        </svg>
      </div>
      <div className={styles.button}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path d="M37.2 87.9l-4.3-4.2L68.6 48l-36-36 4.3-4.3L77.1 48"/>
        </svg>
      </div>
      <div className={`${styles.button} ${styles.sidebar}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path fill="#939393" d="M23 31c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-7c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v7zm0 15c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-7c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v7zm0 15c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-7c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v7z"/>
          <path fill="#939393" d="M86 11H14c-4.962 0-9 4.038-9 9v60c0 4.962 4.038 9 9 9h72c4.962 0 9-4.038 9-9V20c0-4.962-4.038-9-9-9zM11 80V20c0-1.654 1.346-3 3-3h15.03v66H14c-1.654 0-3-1.346-3-3zm78 0c0 1.654-1.346 3-3 3H35.03V17H86c1.654 0 3 1.346 3 3v60z"/>
        </svg>
      </div>
    </div>
    <div className={styles.addressbar}>{ address }</div>
  </div>
  <div className={styles.screen} style={{ backgroundColor: bg }}>
    { children }
  </div>
</div>
