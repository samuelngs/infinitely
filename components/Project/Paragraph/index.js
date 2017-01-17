
import Inferno from 'inferno';
import Component from 'inferno-component';

import AnimationFadeIn from '../../AnimationFadeIn';

import styles from './styles.css';

export default class Paragraph extends Component {

  renderContent() {
    const { template: { src, ref }, assets: { content, technologies } } = this.props;
    switch ( src ) {
      case 'content':
        return content[ref];
      case 'technologies':
        return technologies.map((name, i) => [ i > 0 && (i === technologies.length - 1 ? ' and ' : ', '), <strong>{ name }</strong>] )
      default:
        return null;
    }
  }

  render({ timeout = 300.0, template: { title } }) {
    return <AnimationFadeIn timeout={timeout} className={styles.root}>
      <div>
        <h2 className={styles.title}>{ title }</h2>
        <p className={styles.content}>{ this.renderContent() }</p>
      </div>
    </AnimationFadeIn>
  }

}

