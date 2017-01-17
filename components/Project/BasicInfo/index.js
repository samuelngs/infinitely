
import Inferno from 'inferno';

import AnimationFadeIn from '../../AnimationFadeIn';

import styles from './styles.css';

function Credit({ enable }) {
  return enable && <p className={styles.credit}>All product names, logos, and brands are property of their respective owners.</p>;
}

export default ({ timeout, page: { base: { name, desc, copyright } } }) => <AnimationFadeIn timeout={timeout} className={styles.root}>
  <h1 className={styles.title}>{ name }</h1>
  <p className={styles.subtitle}>{ desc }</p>
  <Credit enable={copyright} />
</AnimationFadeIn>
