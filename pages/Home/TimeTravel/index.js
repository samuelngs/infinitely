
import Inferno from 'inferno';

import TimeLine from '../../../components/Timeline';

import styles from './styles.css';

const defaults = {
  since: 2016,
};

export default ({ since = defaults.since }) => <div className={styles.root}>
  <TimeLine since={since} />
</div>

