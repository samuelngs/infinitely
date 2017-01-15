
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

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { children, timeout = defaults.timeout, showcases = defaults.showcases } = this.props;
    const { main, top, bottom } = typeof children === 'function' ? { ...defaults.template, ...children() }  : defaults.template;
    return <div className={styles.root}>
      <AnimationFadeIn timeout={timeout} className={`${styles.big} ${styles.bslidel} ${styles.main}`} custom={styles.aslidel}>
        { main }
      </AnimationFadeIn>
      { showcases && <div className={styles.showcases}>
        <AnimationFadeIn timeout={timeout + 650} className={`${styles.small} ${styles.bslider}`} custom={styles.aslider}>
          { top }
        </AnimationFadeIn>
        <AnimationFadeIn timeout={timeout + 750} className={`${styles.small} ${styles.bslider}`} custom={styles.aslider}>
          { bottom }
        </AnimationFadeIn>
      </div> }
    </div>
  }

}
