
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';
import { Head, Title, Meta } from 'weave-head';

import Footer from '../../components/Footer';
import HeroGrid from '../../components/HeroGrid';
import Introduction from '../../components/Introduction';

import HeroMain from './HeroMain';
import Profile from './Profile';
import TimeTravel from './TimeTravel';

import skills from './skills.js';

export default class Home extends Component {

  componentDidMount() {
    if ( typeof window !== 'undefined' ) {
      window.scrollTo(0, 0);
    }
    if ( typeof window !== 'undefined' && typeof window.ga !== 'undefined' ) {
      window.ga('send', 'pageview', { page: location.pathname });
    }
  }

  render({ pages }) {
    const { route: { hero: HeroTop } } = pages[pages.length - 2];
    const { route: { hero: HeroBottom } } = pages[pages.length - 1];
    return <div>
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
          main  : <HeroMain effect="blob" title="A software developer living in Edmonton, Canada." subtitle="I develop apps for Web and Mobile" />,
          top   : <HeroTop bg="#11192A" />,
          bottom: <HeroBottom bg="#c6e2e9" />,
        })}
      </HeroGrid>
      <Introduction
        title="Who am I"
        content={[
          "I am Sam, a software developer. I studied computer science at Northern Alberta Institute of Technology in Edmonton, Alberta.",
          "I am a highly motivated individual and a team player. I have a great passion for design and programming.",
          <span>Some of my work is shared on <a href="https://dribbble.com/samuelngs" target="_blank">Dribbble</a> and <a href="https://github.com/samuelngs" target="_blank">Github</a>. Find my full resume directly on <a href="https://www.linkedin.com/in/samuelngs" target="_blank">LinkedIn</a>.</span>,
        ]}
        timeout={800}
      >
        <Profile />
      </Introduction>
      <Introduction
        title="Skills & Experience"
        content={[
          "Strong in design and problem solving skills. Expertise in *nix system and command-line. Fluent in Golang, Javascript, Node.js, PHP, Java and Objective-C. Worked with Etcd, Redis, NSQ, MySQL, RethinkDB, MongoDB and Cassandra.",
          "Proficient in front-end development with React, Inferno, Mithril, Angular.js and Backbone.js. Full knowledge of payment gateway, microservices architecture and distributed systems.",
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
