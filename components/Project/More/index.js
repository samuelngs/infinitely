
import Inferno from 'inferno';

import AnimationFadeIn from '../../AnimationFadeIn';
import Timeline from '../../Timeline';

import styles from './styles.css';

export default ({ timeout, history }) => <AnimationFadeIn timeout={timeout} className={styles.root}>
  <Timeline since={2003} events={history} />
</AnimationFadeIn>
