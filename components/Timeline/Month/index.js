
import Inferno from 'inferno';
import Component from 'inferno-component';

import styles from './styles.css';

const defaults = {
  string: '',
  events: [ ],
};

export default class Month extends Component {

  renderEvent({ n = 0, offset = 0, style = defaults.string, render }) {
    return <div className={`${styles.event} ${style}`} style={{ bottom: `calc(35% - ${(n + offset) * 36}px)` }}>
      { typeof render === 'function' ? render() : render }
    </div>
  }

  renderEvents() {
    const { events = defaults.events } = this.props;
    return events.map(e => this.renderEvent(e));
  }

  render() {
    const { month, number } = this.props;
    return <div className={`${styles.root} ${number % 6 === 0 ? number === 6 ? styles.half : styles.full : defaults.string}`}>
      <div className={styles.line} />
      <div className={styles.month}>{ month.substring(0, 3) }</div>
      { this.renderEvents() }
    </div>
  }

}

