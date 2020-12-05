
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
    const { timeout = defaults.timeout, title = defaults.string, content = defaults.content, children, allowOverlay = false, background, clipPath } = props;
    return <AnimationFadeIn timeout={timeout}>
      <div className={styles.root} data-scroll-section>
        <div className={`${styles.c2} ${styles.main}`} style={{ background }}>
          <h3 className={styles.title} data-scroll>
            <span data-scroll data-scroll-speed="-0.1" data-scroll-position="bottom">—</span>
            {' '}
            <span data-scroll data-scroll-speed="0.5">{ title }</span>
          </h3>
          <div className={styles.paragraph}>
            { Array.isArray(content) && content.map(
              (t, i) => <Paragraph content={t} index={i} />
            ) }
          </div>
        </div>
        <div className={[styles.c1, allowOverlay && styles.c1_overlay].filter(o => o).join(' ')} data-scroll data-scroll-speed="3">
          { children }
        </div>
      </div>
    </AnimationFadeIn>
  }

}

