
import Inferno from 'inferno';
import Component from 'inferno-component';

import Logo from '../Logo';

import styles from './styles.css';

const defaults = {
  string: '',
};

export default class Header extends Component {

  state = {
    y: 0,
  }

  componentDidMount() {
    const { store: { subscribe, getState } } = this.context;
    const { position: { y } } = getState();
    this.setState({ y }, () => {
      subscribe(_ => {
        const { position: { y } } = getState();
        return this.setState({ y });
      });
    });
  }

  onLogoClick(e) {
    e.preventDefault && e.preventDefault();
    const { router: { push } } = this.context;
    push('/');
  }

  shouldComponentUpdate(props, { y: next }) {
    const { y: prev } = this.state;
    return next !== prev;
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
