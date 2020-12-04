
import Inferno from 'inferno';
import Component from 'inferno-component';

import AnimationFadeIn from '../../AnimationFadeIn';
import Browser from '../../Browser';
import IPhone from '../../IPhone';
import Zoom from '../../Zoom';

import styles from './styles.css';

export default class Showcase extends Component {

  getAsset(media) {
    const { assets: { videos, images } } = this.props;
    switch ( media.type ) {
      case 'video':
        return videos[media.src];
      case 'image':
        return images[media.src];
      default:
        return undefined;
    }
  }

  renderImage(img, className = '') {
    return <Zoom
      image={{ src: img.cover || img.path, alt: img.desc, className }}
      zoomImage={{ src: img.cover || img.path, alt: img.desc, className: styles.fullscreen }}
      video={img.cover && img.path}
    />
  }

  renderDesktop(item) {
    const { base: { name, brand } } = this.props;
    const asset = this.getAsset(item)
    return <div className={styles.browser_wrapper}>
      <Browser className={styles.browser_ui} address={`${ brand }, ${ name }`} bg="#fff">
        { this.renderImage(asset, styles.browser_media) }
      </Browser>
    </div>
  }

  renderiPhone(item) {
    const { base: { name, brand } } = this.props;
    const asset = this.getAsset(item)
    return <div className={styles.iphone_wrapper}>
      <IPhone className={styles.iphone_ui} address={`${ brand }, ${ name }`} bg="#fff">
        { this.renderImage(asset, styles.iphone_media) }
      </IPhone>
    </div>
  }

  renderMedia(item) {
    const { template: { frame } } = this.props;
    switch ( frame ) {
      case 'desktop':
        return this.renderDesktop(item);

      case 'iphone':
        return this.renderiPhone(item);

      default:
        return null;
    }
  }

  render({ timeout = 300.0, template: { media } }) {
    return <AnimationFadeIn timeout={timeout} className={styles.root}>
      <div className={styles.infinite} data-scroll-section>
        <div className={styles.infinite} data-scroll data-scroll-speed="1">
          { media.map(item => this.renderMedia(item)) }
        </div>
      </div>
    </AnimationFadeIn>
  }

}


