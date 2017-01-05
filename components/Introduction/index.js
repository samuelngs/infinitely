
import Inferno from 'inferno';

import AnimationFadeIn from '../AnimationFadeIn';

import styles from './styles.css';

const defaults = {
  string: '',
  content: [''],
  timeout: 600,
};

function Paragraph({ content }) {
  return <p className={styles.content}>
    { content }
  </p>
}

export default (props) => {
  const { timeout = defaults.timeout, title = defaults.string, content = defaults.content, children } = props;
  return <AnimationFadeIn timeout={timeout} className={styles.root}>
    <div className={`${styles.c2} ${styles.main}`}>
      <h3 className={styles.title}>— { title }</h3>
      { Array.isArray(content) && content.map(
        t => <Paragraph content={t} />
      ) }
    </div>
    <div className={styles.c1}>
      { children }
    </div>
  </AnimationFadeIn>
}
