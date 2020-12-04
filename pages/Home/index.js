
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';
import { Head, Title, Meta } from 'weave-head';

import Footer from '../../components/Footer';
import HeroGrid from '../../components/HeroGrid';
import Introduction from '../../components/Introduction';

import Profile from './Profile';
import TimeTravel from './TimeTravel';

import skills from './skills.js';

export default class Home extends Component {

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
        reloadOnContextChange: true,
      });
      this.scroll.on('scroll', (args) => {
        const { x, y } = args.scroll;
        dispatch({ type: 'WEAVE_POSITION_CHANGED', x, y });
      });
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

  render({ pages }) {
    const { route: { hero: HeroTop } } = pages[0];
    const { route: { hero: HeroBottom } } = pages[1];
    const { route: { hero: HeroMain } } = pages[2];
    return <div data-scroll-container>
      <Head>
        <Title>Infinitely</Title>
        <Meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <Meta name="HandheldFriendly" content="true" />
        <Meta name="MobileOptimized" content="320" />
        <Meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Meta name="description" content="I'm a software developer and entrepreneur living in Canada. I build high-availability applications and api services, and I manage cloud services." />
        <Meta name="keywords" content={"cv, resume, portfolio, software developer, full stack developer, devops, web, app, dribbble, kubernetes, microservices, golang, sam ng, edmonton, canada"} />
        <Meta name="classification" content={"cv, resume, portfolio, software developer, full stack developer, devops, web, app, dribbble, kubernetes, microservices, golang, sam ng, edmonton, canada"} />
        <Meta name="referrer" content="origin-when-cross-origin" />
        <Meta name="distribution" content="Global" />
        <Meta name="rating" content="General" />
        <Meta name="robots" content="index, follow" />
        <Meta name="creator" content="Sam Ng" />
      </Head>
      <HeroGrid showcases={true}>
        {() => ({
          main  : <HeroMain />,
          top   : <HeroTop bg="#11192a" />,
          bottom: <HeroBottom bg="#c6e2e9" />,
        })}
      </HeroGrid>
      <Introduction
        title="Who am I"
        content={[
          'Hey, I\'m Sam. I am a skilled and passionate software developer with more than 5 years of professional experience building large-scale systems and applications. ',
          'I excel in full-stack development and dev-ops engineering. I have built applications and systems that are used by millions, including influencers and companies such as Celine Dion, Janet Jackson, Malala, Bing, OpenTable and Product Hunt',
          <span>Some of my work are shared on <a href="https://github.com/samuelngs" target="_blank">Github</a> and <a href="https://dribbble.com/samuelngs" target="_blank">Dribbble</a>. You can also find my full resume on <a href="https://www.linkedin.com/in/sngs" target="_blank">LinkedIn</a>.</span>,
        ]}
        timeout={800}
      >
        <Profile />
      </Introduction>
      <Introduction
        title="Skills & Experience"
        content={[
          "Strong in design and problem solving skills. Expertise in *nix system and command-line. Fluent in Golang, Javascript, Ruby, Java, Swift and Objective-C. Worked with Redis, Postgres, MySQL, Kafka, MongoDB and Cassandra.",
          "Proficient in front-end development with React, Inferno, Mithril and Backbone.js. Full knowledge of payment gateway, microservices architecture and distributed systems.",
          "Experience in Amazon Web Services, Google Cloud Platform, and continuous delivery with Docker and Kubernetes.",
        ]}
        timeout={1000}
      >
        <TimeTravel since={2005} events={skills} />
      </Introduction>
      <Footer />
    </div>
  }

}
