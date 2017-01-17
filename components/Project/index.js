
import Inferno from 'inferno';
import Component from 'inferno-component';
import { Head, Title, Meta } from 'weave-head';

import AnimationFadeIn from '../AnimationFadeIn';
import BasicInfo from './BasicInfo';
import Carousel from './Carousel';
import Showcase from './Showcase';
import Paragraph from './Paragraph';
import More from './More';

import styles from './styles.css';

export default class Project extends Component {

  componentDidMount() {
    if ( typeof window !== 'undefined' ) {
      window.scrollTo(0, 0);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  renderTemplate(tmpl, i) {
    const { page: { base, assets } } = this.props;
    const timeout = 1500 + 300 * i;
    switch ( tmpl.type ) {
      case 'carousel':
        return <Carousel timeout={timeout} template={tmpl} base={base} assets={assets} />;
      case 'showcase':
        return <Showcase timeout={timeout} template={tmpl} base={base} assets={assets} />;
      case 'paragraph':
        return <Paragraph timeout={timeout} template={tmpl} base={base} assets={assets} />;
      default:
        return null;
    }
  }

  render() {
    const { page: { meta, base: { name, desc, summary, keys, brand, creator, publisher, copyright }, assets: { content, videos, images, technologies, templates } }, history } = this.props;
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
        <BasicInfo { ...this.props } timeout={1500} />
        { templates.map((tmpl, i) => this.renderTemplate(tmpl, i)) }
        <More { ...this.props } timeout={1500 + (300 * templates.length) + 300} />
      </AnimationFadeIn>
    </div>
  }

}
