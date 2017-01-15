
import Inferno from 'inferno';
import Component from 'inferno-component';
import { Head, Title, Meta } from 'weave-head';

import AnimationFadeIn from '../AnimationFadeIn';
import BasicInfo from './BasicInfo';
import More from './More';

import styles from './styles.css';

export default class Showcase extends Component {

  orders() {
    return [ ];
  }

  render() {
    const { page: { meta, base: { name, desc, summary, keys, brand, creator, publisher, copyright }, assets: { content, videos, images, technologies } }, history } = this.props;
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
      <AnimationFadeIn timeout={200} className={`${styles.root} ${styles.pre}`} custom={styles.rendered}>
        <BasicInfo { ...this.props } timeout={1200} />
        <More { ...this.props } timeout={1500} />
      </AnimationFadeIn>
    </div>
  }

}
