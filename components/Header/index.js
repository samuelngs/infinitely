
import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'weave-router';

import Logo from '../Logo';

import styles from './styles.css';

const defaults = {
  string: '',
};

export default class Header extends Component {

  onLogoClick(e) {
    e.preventDefault && e.preventDefault();
    const { router: { push } } = this.context;
    push('/');
  }

  render() {
    const { store: { getState } } = this.context;
    const { position: { y } } = getState();
    return <header className={`${styles.root} ${y > 30.0 ? styles.sticky : defaults.string}`}>
      <a href="/" onClick={::this.onLogoClick}>
        <Logo className={styles.logo} />
      </a>
    </header>
  }

}
