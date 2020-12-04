
import Inferno from 'inferno';
import Component from 'inferno-component';

import AnimationFadeIn from '../AnimationFadeIn';

import styles from './styles.css';

const defaults = {
  string: '',
  content: [''],
  timeout: 600,
};

function Paragraph({ content, index }) {
  return <p className={styles.content} data-scroll data-scroll-speed={`${0.7 + index / 3}`}>
    { content }
  </p>
}

export default class Introduction extends Component {

  shouldComponentUpdate(props, state) {
    return false;
  }

  render(props) {
    const { timeout = defaults.timeout, title = defaults.string, content = defaults.content, children } = props;
    return <AnimationFadeIn timeout={timeout} className={styles.root} data-scroll-section>
      <div className={`${styles.c2} ${styles.main}`}>
        <h3 className={styles.title} data-scroll data-scroll-speed="0.5">— { title }</h3>
        <div className={styles.paragraph}>
          { Array.isArray(content) && content.map(
            (t, i) => <Paragraph content={t} index={i} />
          ) }
        </div>
      </div>
      <div className={styles.c1} data-scroll data-scroll-speed="3">
        { children }
      </div>
    </AnimationFadeIn>
  }

}

