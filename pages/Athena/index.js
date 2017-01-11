
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';
import { Head, Title, Meta } from 'weave-head';

import AnimationFadeIn from '../../components/AnimationFadeIn';
import Browser from '../../components/Browser';

import video from '../../assets/athena/videos/athena-large-login.mp4';
import video2 from '../../assets/athena/videos/athena-large-user.mp4';
import video3 from '../../assets/athena/videos/athena-large-map.mp4';
import video4 from '../../assets/athena/videos/athena-large-services.mp4';
import cover from '../../assets/athena/images/athena-large-login.png';
import styles from './styles.css';

const doc = {
  title: 'Athena',
  description: 'A internal customer and provider management platform for Yardly, a lawn care & snow removal service platform.',
};

export default class Athena extends Component {

  render() {
    const { title, description } = doc;
    return <div>
      <Head>
        <Title>Athena | Infinitely</Title>
        <Meta name="HandheldFriendly" content="true" />
        <Meta name="MobileOptimized" content="320" />
        <Meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Meta name="description" content="Sam Ng, full stack developer living in Canada" />
      </Head>
      <AnimationFadeIn timeout={200} className={`${styles.root} ${styles.before}`} custom={styles.after}>
        <AnimationFadeIn timeout={1200} className={styles.container}>
          <h1 className={styles.title}>{ title }</h1>
          <p className={styles.subtitle}>{ description }</p>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={1500} className={`${styles.container} ${styles.center}`}>
          <div className={`${styles.hr} ${styles.showcase}`}>
            <Browser className={styles.browser} address="https://yardly.ca" bg="#11192A">
              <video width="1440px" height="798px" preload="metadata" poster={cover} autoplay loop muted>
                <source src={video} type="video/mp4" />
              </video>
            </Browser>
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={1800} className={`${styles.container} ${styles.center}`}>
          <div className={`${styles.hr} ${styles.showcase}`}>
            <Browser className={styles.browser} address="https://yardly.ca" bg="#eee">
              <video width="1440px" height="798px" preload="metadata" poster={cover} autoplay loop muted>
                <source src={video2} type="video/mp4" />
              </video>
            </Browser>
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={2100} className={`${styles.container} ${styles.center}`}>
          <div className={`${styles.hr} ${styles.showcase}`}>
            <Browser className={styles.browser} address="https://yardly.ca" bg="#eee">
              <video width="1440px" height="798px" preload="metadata" poster={cover} autoplay loop muted>
                <source src={video3} type="video/mp4" />
              </video>
            </Browser>
          </div>
        </AnimationFadeIn>
        <AnimationFadeIn timeout={2400} className={`${styles.container} ${styles.center}`}>
          <div className={`${styles.hr} ${styles.showcase}`}>
            <Browser className={styles.browser} address="https://yardly.ca" bg="#eee">
              <video width="1440px" height="798px" preload="metadata" poster={cover} autoplay loop muted>
                <source src={video4} type="video/mp4" />
              </video>
            </Browser>
          </div>
        </AnimationFadeIn>
      </AnimationFadeIn>
    </div>
  }

}

