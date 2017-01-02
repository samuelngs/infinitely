
import Inferno from 'inferno';

import Logo from '../Logo';

import styles from './styles.css';

export default () => <header className={styles.root}>
  <Logo className={styles.logo} />
</header>
