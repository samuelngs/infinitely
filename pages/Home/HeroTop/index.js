
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';

import styles from './styles.css';

const defaults = {
  string: '',
};

export default class HeroTop extends Component {

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

  render() {
    const { bg = defaults.string } = this.props;
    const { visible } = this.state;
    return <div className={styles.root} style={bg && { backgroundColor: bg }}>
    </div>
  }

}

