
import Inferno from 'inferno';
import Component from 'inferno-component';

import AnimationFadeIn from '../../AnimationFadeIn';
import Browser from '../../Browser';
import Zoom from '../../Zoom';

import styles from './styles.css';

export default class Showcase extends Component {

  renderImage(img, className = '') {
    return <Zoom
      image={{ src: img.path, alt: img.desc, className }}
      zoomImage={{ src: img.path, alt: img.desc, className: styles.fullscreen }}
    />
  }

  renderDesktop(item) {
    const { assets: { videos, images }, base: { name, brand } } = this.props;
    return <div className={styles.browser_wrapper}>
      <Browser className={styles.browser_ui} address={`${ brand }, ${ name }`} bg="#fff">
        { this.renderImage(images[item.src], styles.browser_media) }
      </Browser>
    </div>
  }

  renderMedia(item) {
    const { template: { frame } } = this.props;
    switch ( frame ) {
      case 'desktop':
        return this.renderDesktop(item);
      default:
        return null;
    }
  }

  render({ timeout = 300.0, template: { media } }) {
    return <AnimationFadeIn timeout={timeout} className={styles.root}>
      <div className={styles.infinite}>
        { media.map(item => this.renderMedia(item)) }
      </div>
    </AnimationFadeIn>
  }

}


