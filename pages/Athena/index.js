
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';
import { Head, Title, Meta } from 'weave-head';

import AnimationFadeIn from '../../components/AnimationFadeIn';
import Zoom from '../../components/Zoom';
import Browser from '../../components/Browser';
import Timeline from '../../components/Timeline';

import video1 from '../../assets/athena/videos/athena-large-login.mp4';
import video2 from '../../assets/athena/videos/athena-large-user.mp4';
import video3 from '../../assets/athena/videos/athena-large-map.mp4';
import video4 from '../../assets/athena/videos/athena-large-services.mp4';

import blur1 from '../../assets/athena/images/athena-large-login-blur.jpg';
import blur2 from '../../assets/athena/images/athena-large-user-blur.jpg';
import blur3 from '../../assets/athena/images/athena-large-map-blur.jpg';
import blur4 from '../../assets/athena/images/athena-large-services-blur.jpg';

import cover1 from '../../assets/athena/images/athena-large-login.jpg';
import cover2 from '../../assets/athena/images/athena-large-user.jpg';
import cover3 from '../../assets/athena/images/athena-large-map.jpg';
import cover4 from '../../assets/athena/images/athena-large-services.jpg';

import shot1 from '../../assets/athena/images/athena-shot-01.jpg';
import shot2 from '../../assets/athena/images/athena-shot-02.jpg';
import shot3 from '../../assets/athena/images/athena-shot-03.jpg';
import shot4 from '../../assets/athena/images/athena-shot-04.jpg';
import shot5 from '../../assets/athena/images/athena-shot-05.jpg';
import shot6 from '../../assets/athena/images/athena-shot-06.jpg';

import styles from './styles.css';

const doc = {
  title: 'Athena',
  description: 'Customer and provider management console for Yardly, a lawn care & snow removal company located in Edmonton, Canada.',
  overview: 'Athena allows to manage customer and partner profiles, payment and contact information, monitor providers\' activities, and track visits statuses.',
  keywords: 'Yardly, Athena, lawn care, snow removal, management, console, golang, javascript',
};

const videos = [
  { blur: blur1, cover: cover1, src: video1, desc: 'Athena Login' },
  { blur: blur2, cover: cover2, src: video2, desc: 'Athena People' },
  { blur: blur3, cover: cover3, src: video3, desc: 'Athena Map' },
  { blur: blur4, cover: cover4, src: video4, desc: 'Athena Services' },
];

const shots = [
  { src: shot1, desc: 'Athena User Profile' },
  { src: shot2, desc: 'Athena User Payments' },
  { src: shot3, desc: 'Athena Remove Payment' },
  { src: shot4, desc: 'Athena Direction' },
  { src: shot5, desc: 'Athena Expressions' },
  { src: shot6, desc: 'Athena Expression Composer' },
];

export default class Athena extends Component {

  state = {
    idx: 0,
  }

  componentDidMount() {
    if ( typeof window !== 'undefined' ) {
      window.scrollTo(0, 0);
    }
  }

  onOptionClick(i) {
    this.setState({ idx: i });
  }

  render() {
    const { title, description, overview, keywords } = doc;
    const { idx } = this.state;
    const video = videos[idx];
    return <div>
      <Head>
        <Title>Athena | Infinitely</Title>
        <Meta name="HandheldFriendly" content="true" />
        <Meta name="MobileOptimized" content="320" />
        <Meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Meta name="description" content={description} />
        <Meta name="keywords" content={keywords} />
      </Head>
      <AnimationFadeIn timeout={200} className={`${styles.root} ${styles.before}`} custom={styles.after}>
        <AnimationFadeIn timeout={1200} className={styles.container}>
          <h1 className={styles.title}>{ title }</h1>
          <p className={styles.subtitle}>{ description }</p>
          <p className={styles.copyright}>All product names, logos, and brands are property of their respective owners.</p>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={1500} className={styles.showcase}>
          <div>
            <div className={styles.options}>
              { videos.map((video, i) => <div className={styles.option} onClick={() => this.onOptionClick(i)}><img src={video.cover} /></div>) }
            </div>
            <Browser className={styles.browser} address="Yardly, Athena" bg="#11192A">
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
                video={video.src}
              />
            </Browser>
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={1800} className={styles.container}>
          <div>
            <h4 className={styles.sectitle}>Application Overview</h4>
            <p className={styles.subtitle}>{ overview }</p>
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={2100} className={`${styles.showcase} ${styles.screens}`}>
          <div className={styles.scroll}>
            { shots.map(shot => <div className={styles.mini}>
              <Browser className={styles.browser} address="Yardly, Athena" bg="#11192A">
                <Zoom
                  image={{
                    src: shot.src,
                    alt: shot.desc,
                    className: styles.media,
                  }}
                  zoomImage={{
                    src: shot.src,
                    alt: shot.desc,
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
              <strong>Microservices architecture</strong>, <strong>Go</strong>, <strong>Javascript</strong>, <strong>React</strong>, <strong>Etcd</strong>, <strong>NSQ</strong>, <strong>Redis</strong>, <strong>Cassandra</strong> and <strong>Docker</strong>
            </p>
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={2700} className={styles.timeline}>
          <Timeline since={2003} />
        </AnimationFadeIn>
      </AnimationFadeIn>
    </div>
  }

}

