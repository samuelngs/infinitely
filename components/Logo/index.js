
import Inferno from 'inferno';

import SVG from '../SVG';
import AnimationFadeIn from '../AnimationFadeIn';

import nlogo from './images/infinitely-logo.svg';
import blogo from './images/infinitely-logo-bold.svg';

import styles from './styles.css';

export default ({ className = '', bold = false }) => <div className={`${styles.root} ${className}`}>
  <AnimationFadeIn timeout={200}>
    <SVG className={styles.svg} src={ bold ? blogo : nlogo } />
  </AnimationFadeIn>
</div>
