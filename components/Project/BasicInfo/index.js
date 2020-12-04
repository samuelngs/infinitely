
import Inferno from 'inferno';

import AnimationFadeIn from '../../AnimationFadeIn';

import styles from './styles.css';

function Credit({ enable }) {
  return enable && <p className={styles.credit} data-scroll data-scroll-speed="4">All product names, logos, and brands are property of their respective owners.</p>;
}

export default ({ timeout, page: { base: { name, desc, copyright } } }) => <AnimationFadeIn timeout={timeout} className={styles.root}>
  <div data-scroll-section>
    <h1 className={styles.title} data-scroll data-scroll-speed="2">{ name }</h1>
    <p className={styles.subtitle} data-scroll data-scroll-speed="3">{ desc }</p>
    <Credit enable={copyright} />
  </div>
</AnimationFadeIn>
