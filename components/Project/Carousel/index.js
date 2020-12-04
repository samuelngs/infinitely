
import Inferno from 'inferno';
import Component from 'inferno-component';

import AnimationFadeIn from '../../AnimationFadeIn';
import Browser from '../../Browser';
import Zoom from '../../Zoom';

import styles from './styles.css';

export default class Carousel extends Component {

  state = {
    idx: 0,
  }

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

  onOptionSelected(idx) {
    return this.setState({ idx });
  }

  renderOption(item, i) {
    const asset = this.getAsset(item);
    if ( !asset ) {
      return null;
    }
    const { path, cover } = asset;
    return <img className={styles.option} src={cover || path} onClick={() => this.onOptionSelected(i)} />
  }

  renderOptions() {
    const { template: { media } } = this.props;
    return <div className={styles.options} data-scroll>
      { media.map((item, i) => this.renderOption(item, i)) }
    </div>
  }

  renderMedia({ path, cover, desc }, className = '') {
    return <Zoom
      image={{
        src: cover || path,
        alt: desc,
        className,
      }}
      zoomImage={{
        src: cover || path,
        alt: desc,
        className: styles.fullscreen,
      }}
      video={path}
    />
  }

  renderScreen(asset) {
    return <div className={styles.screen} data-scroll data-scroll-speed="1">
      <div className={styles.control}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M74.437,53.959c1.589-1.589,1.589-4.166,0-5.755c-0.416-0.416-40.529-25.479-40.766-25.598l-0.03-0.019l-0.002,0.001  c-0.539-0.263-1.136-0.424-1.775-0.424c-2.015,0-3.676,1.468-4.001,3.391L27.794,75.93c0,2.247,1.822,4.069,4.069,4.069  c0.635,0,1.228-0.158,1.763-0.417L74.437,53.959z"></path></svg>
      </div>
      { this.renderMedia(asset, styles.screen_media) }
    </div>
  }

  renderDesktop(asset) {
    const { base: { brand, name } } = this.props;
    return <Browser className={styles.browser} address={`${ brand }, ${ name }`} bg="#fff">
      { this.renderMedia(asset, styles.browser_media) }
    </Browser>
  }

  renderSelected() {
    const { template: { frame, media } } = this.props;
    const { idx } = this.state;
    const asset = this.getAsset(media[idx]);
    if ( !asset) {
      return null;
    }
    switch ( frame ) {
      case 'screen':
        return this.renderScreen(asset);
      case 'desktop':
        return this.renderDesktop(asset);
      default:
        return null;
    }
  }

  render({ timeout = 300.0, template, assets }) {
    return <div data-scroll-section>
      <AnimationFadeIn timeout={timeout}>
        <div className={styles.root}>
          { this.renderOptions() }
          { this.renderSelected() }
        </div>
      </AnimationFadeIn>
    </div>
  }

}
