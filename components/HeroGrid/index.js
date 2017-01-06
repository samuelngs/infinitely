
import Inferno from 'inferno';
import Component from 'inferno-component';

import AnimationFadeIn from '../../components/AnimationFadeIn';

import styles from './styles.css';

const defaults = {
  template: {
    main: null,
    top: null,
    bottom: null,
  },
  showcases: false,
  timeout: 600,
};

export default class HeroGrid extends Component {

  render() {
    const { children, timeout = defaults.timeout, showcases = defaults.showcases } = this.props;
    const { main, top, bottom } = typeof children === 'function' ? { ...defaults.template, ...children() }  : defaults.template;
    return <div className={styles.root}>
      <div className={styles.big}>
        <AnimationFadeIn timeout={timeout} className={`${styles.container} ${styles.bslidel} ${styles.main}`} custom={styles.aslidel}>
        { main }
        </AnimationFadeIn>
      </div>
      { showcases && <div className={styles.showcases}>
        <div className={styles.small}>
          <AnimationFadeIn timeout={timeout + 550} className={`${styles.container} ${styles.bslider}`} custom={styles.aslider}>
            { top }
          </AnimationFadeIn>
        </div>
        <div className={styles.small}>
          <AnimationFadeIn timeout={timeout + 650} className={`${styles.container} ${styles.bslider}`} custom={styles.aslider}>
            { bottom }
          </AnimationFadeIn>
        </div>
      </div> }
    </div>
  }

}

