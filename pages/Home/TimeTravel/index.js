
import Inferno from 'inferno';

import Timeline from '../../../components/Timeline';

import styles from './styles.css';

const defaults = {
  since: 2016,
  events: [ ],
};

export default ({ since = defaults.since, events = defaults.events, ...rest }) => <div className={styles.root}>
  <Timeline since={since} events={events} {...rest} />
</div>

