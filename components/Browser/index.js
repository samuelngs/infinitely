
import Inferno from 'inferno';
import Component from 'inferno-component';

import styles from './styles.css';

const defaults = {
  string: '',
  address: '',
  bg: '#fff',
};

export default class Browser extends Component {

  render({ children, className = defaults.string, bg = defaults.bg, address = defaults.address }) {
    return <div className={`${styles.root} ${className}`}>
      <div className={styles.header}>
        <div className={styles.fill}>
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
        </div>
        <div className={styles.fill}>
          <div className={styles.addressbar}>
            <svg className={styles.lock} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.02 58.367">
              <path fill="none" stroke="#11C575" stroke-width="4" d="M6.962 25.082c0-.47.02-8.472.064-8.94C7.734 8.215 14.396 2 22.51 2c8.15 0 14.83 6.27 15.488 14.25.04.428.06 8.396.06 8.832"/>
              <path fill="#11C575" stroke="#11C575" stroke-width="2.5" stroke-linejoin="round" d="M1.25 24.848h42.52v32.27H1.25z"/>
            </svg>
            { address }
          </div>
        </div>
        <div className={styles.fill}>
          <div className={styles.group}>
            <div className={`${styles.button} ${styles.sidebar}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                <path fill="#939393" d="M11 15h1V0h-1"/>
                <path fill="#939393" d="M11.268.684l4.367 4.658.73-.685L11.998 0"/>
                <path fill="#939393" d="M6.635 4.658l.73.684 4.36-4.648-.73-.684M18 7h-4v1h4v13H5V8h4V7H5c-.552 0-1 .448-1 1v13c0 .552.448 1 1 1h13c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1"/>
              </svg>
            </div>
            <div className={`${styles.button} ${styles.sidebar}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path fill="#939393" d="M85.03 5H32.76c-5.497 0-9.97 4.473-9.97 9.97v7.82h-7.82C9.472 22.79 5 27.264 5 32.76v52.272C5 90.527 9.473 95 14.97 95h52.27c5.496 0 9.97-4.473 9.97-9.97v-7.82h7.82c5.497 0 9.97-4.474 9.97-9.97V14.97C95 9.473 90.528 5 85.03 5zM72.417 85.03c0 2.854-2.324 5.178-5.18 5.178H14.97c-2.854 0-5.178-2.323-5.178-5.178V32.76c0-2.854 2.323-5.178 5.178-5.178h52.27c2.854 0 5.178 2.323 5.178 5.178v52.27zm17.79-17.79c0 2.854-2.323 5.177-5.18 5.177H77.21V32.76c0-5.496-4.474-9.97-9.972-9.97H27.583v-7.82c0-2.854 2.323-5.178 5.178-5.178h52.27c2.856 0 5.18 2.323 5.18 5.178v52.27z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.screen} style={{ backgroundColor: bg }}>
        { children }
      </div>
    </div>
  }

}

