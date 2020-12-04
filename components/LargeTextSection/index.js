
import Inferno from 'inferno';
import Component from 'inferno-component';

import AnimationFadeIn from '../AnimationFadeIn';

import styles from './styles.css';

const defaults = {
  string: '',
  content: [''],
  timeout: 600,
};

function Paragraph({ content }) {
  return <h3 className={styles.title}>
    { content }
  </h3>
}

export default class Introduction extends Component {

  shouldComponentUpdate(props, state) {
    return false;
  }

  render(props) {
    const { timeout = defaults.timeout, content = defaults.content, children } = props;
    return <AnimationFadeIn timeout={timeout} className={styles.root}>
      <div className={`${styles.c2} ${styles.main}`}>
        { Array.isArray(content) && content.map(
          t => <Paragraph content={t} />
        ) }
      </div>
      <div className={styles.c1}>
        { children }
      </div>
    </AnimationFadeIn>
  }

}

