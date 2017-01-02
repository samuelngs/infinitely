
import Inferno from 'inferno';
import Component from 'inferno-component';

import styles from './styles.css';

const defaults = {
  string: '',
  number: 500,
  bool: false,
};

export default class AnimationFadeIn extends Component {

  state = {
    visible: defaults.bool,
  }

  componentDidMount() {
    if ( typeof window === 'undefined' ) return false;
    const { timeout = defaults.number } = this.props;
    return window.setTimeout(
      () => this.setState({ visible: true }),
      timeout,
    );
  }

  render() {
    const { children, className = defaults.string, custom = defaults.string } = this.props;
    const { visible } = this.state;
    return <div className={`${styles.root} ${visible ? `${styles.visible} ${custom}` : defaults.string} ${className}`}>
      { children }
    </div>
  }

}


