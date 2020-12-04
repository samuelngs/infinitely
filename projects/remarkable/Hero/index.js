
import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'weave-router';

import Browser from '../../../components/Browser';

import styles from './styles.css';

const defaults = {
  string: '',
};

export default class Hero extends Component {

  state = {
    visible: false,
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

  shouldComponentUpdate(props, { visible }) {
    const { visible: current } = this.state;
    return current !== visible;
  }

  onClick(e) {
    e.preventDefault && e.preventDefault();
    const { router: { push } } = this.context;
    return push('/remarkable');
  }

  render() {
    const { bg = defaults.string } = this.props;
    const { visible } = this.state;
    return <a href="/remarkable" className={styles.root} style={bg && { backgroundColor: bg }} onClick={::this.onClick}>
    </a>
  }

}


