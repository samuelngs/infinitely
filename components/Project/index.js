
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
    const { store: { dispatch } } = this.context;

    if ( typeof window !== 'undefined' ) {
      window.scrollTo(0, 0);
      dispatch({ type: 'WEAVE_POSITION_CHANGED', x: 0, y: 0 });
    }
    if ( typeof window !== 'undefined' && typeof window.ga !== 'undefined' ) {
      window.ga('send', 'pageview', { page: location.pathname });
    }
    if ( typeof document !== 'undefined' ) {
      const LocomotiveScroll = require('locomotive-scroll');
      this.destroyScroller();
      this.scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        tablet: { smooth: true },
        reloadOnContextChange: true,
      });
      this.scroll.on('scroll', (args) => {
        const { x, y } = args.scroll;
        dispatch({ type: 'WEAVE_POSITION_CHANGED', x, y });
      });
      setTimeout(() => this.scroll.update(), 1000);
    }
  }

  componentWillUnmount() {
    if ( typeof document !== 'undefined' ) {
      this.destroyScroller();
    }
  }

  destroyScroller() {
    if (!this.scroll) return

    this.scroll.destroy();
    this.scroll = null;
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
    return <div data-scroll-container>
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
