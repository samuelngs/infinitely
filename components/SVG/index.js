
import Inferno from 'inferno';
import Component from 'inferno-component';

import styles from './styles.css';

const defaults = {
  string: '',
  object: { },
};

export default class SVG extends Component {

  state = {
    data: defaults.string,
  }

  componentWillMount() {
    const { src = defaults.string } = this.props;
    if ( src.indexOf('http') === 0 || src.indexOf('https') === 0 ) {
      return fetch(src).then(res => res.text()).then(data => this.setState({ data })).catch(e => e);
    }
    return this.setState({ data: src });
  }

  render() {
    const { src, className = defaults.string, style = defaults.object } = this.props;
    const { data } = this.state;
    if ( !src || data.trim().length === 0 ) {
      return null;
    }
    return <div className={`${styles.root} ${className}`} style={style} dangerouslySetInnerHTML={{__html: data}} />
  }

}

