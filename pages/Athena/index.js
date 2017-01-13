
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Head, Title, Meta } from 'weave-head';

import AnimationFadeIn from '../../components/AnimationFadeIn';
import Timeline from '../../components/Timeline';
import Browser from '../../components/Browser';
import Zoom from '../../components/Zoom';

import styles from './styles.css';

export default class Athena extends Component {

  state = {
    vkey: Object.keys(this.props.page.assets.videos)[0],
  }

  componentDidMount() {
    if ( typeof window !== 'undefined' ) {
      window.scrollTo(0, 0);
    }
  }

  onOptionClick(vkey) {
    this.setState({ vkey });
  }

  render() {
    const { page: { meta, base: { name, desc, summary, keys, brand, creator, publisher, copyright }, assets: { content, videos, images, technologies } }, history } = this.props;
    const { vkey } = this.state;
    const video = videos[vkey];
    return <div>
      <Head>
        <Title>{ `${ name } - ${ summary } | Infinitely` }</Title>
        { meta.map( n => <Meta { ...n } /> ) }
        <Meta name="keywords" content={ keys.join(', ') } />
        <Meta name="classification" content={ keys.join(', ') } />
        <Meta name="description" content={ desc } />
        <Meta name="creator" content={ creator } />
        <Meta name="publisher" content={ publisher } />
      </Head>
      <AnimationFadeIn timeout={200} className={`${styles.root} ${styles.before}`} custom={styles.after}>
        <AnimationFadeIn timeout={1200} className={styles.container}>
          <h1 className={styles.title}>{ name }</h1>
          <p className={styles.subtitle}>{ desc }</p>
          { copyright && <p className={styles.copyright}>All product names, logos, and brands are property of their respective owners.</p> }
        </AnimationFadeIn>
        <AnimationFadeIn timeout={1500} className={styles.showcase}>
          <div>
            <div className={styles.options}>
              { Object.keys(videos).map( key => <div className={styles.option} onClick={() => this.onOptionClick(key)}><img src={videos[key].cover} alt={videos[key].desc} /></div>) }
            </div>
            <Browser className={styles.browser} address={`${ brand }, ${ name }`} bg="#11192A">
              <div className={styles.play}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M74.437,53.959c1.589-1.589,1.589-4.166,0-5.755c-0.416-0.416-40.529-25.479-40.766-25.598l-0.03-0.019l-0.002,0.001  c-0.539-0.263-1.136-0.424-1.775-0.424c-2.015,0-3.676,1.468-4.001,3.391L27.794,75.93c0,2.247,1.822,4.069,4.069,4.069  c0.635,0,1.228-0.158,1.763-0.417L74.437,53.959z"></path></svg>
              </div>
              <Zoom
                image={{
                  src: video.cover,
                  alt: video.desc,
                  className: styles.media,
                }}
                zoomImage={{
                  src: video.cover,
                  alt: video.desc,
                  className: styles.mask,
                }}
                video={video.path}
              />
            </Browser>
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={1800} className={styles.container}>
          <div>
            <h4 className={styles.sectitle}>Application Overview</h4>
            <p className={styles.subtitle}>{ content.intro }</p>
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={2100} className={`${styles.showcase} ${styles.screens}`}>
          <div className={styles.scroll}>
            { Object.keys(images).map(key => <div className={styles.mini}>
              <Browser className={styles.browser} address={`${ brand }, ${ name }`} bg="#11192A">
                <Zoom
                  image={{
                    src: images[key].path,
                    alt: images[key].desc,
                    className: styles.media,
                  }}
                  zoomImage={{
                    src: images[key].path,
                    alt: images[key].desc,
                    className: styles.mask,
                  }}
                />
              </Browser>
            </div>) }
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={2400} className={styles.container}>
          <div>
            <h4 className={styles.sectitle}>Technologies</h4>
            <p className={styles.subtitle}>
              { technologies.map((name, i) => [ i > 0 && (i === technologies.length - 1 ? ' and ' : ', '), <strong>{ name }</strong>] ) }
            </p>
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={2700} className={styles.timeline}>
          <Timeline since={2003} events={history} />
        </AnimationFadeIn>
      </AnimationFadeIn>
    </div>
  }

}

