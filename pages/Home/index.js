
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';
import { Head, Title, Meta } from 'weave-head';

import Footer from '../../components/Footer';
import HeroGrid from '../../components/HeroGrid';
import Introduction from '../../components/Introduction';
import HeroMain from './HeroMain';
import HeroTop from './HeroTop';
import HeroBottom from './HeroBottom';
import Profile from './Profile';
import TimeTravel from './TimeTravel';

import skills from './skills.js';

export default class Home extends Component {

  componentDidMount() {
    if ( typeof window !== 'undefined' ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <div>
      <Head>
        <Title>Infinitely</Title>
        <Meta name="HandheldFriendly" content="true" />
        <Meta name="MobileOptimized" content="320" />
        <Meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Meta name="description" content="Sam Ng, full stack developer living in Canada" />
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
          "I am a highly motivated individual and a team player. I always have a great passion for design and programming.",
          <span>Most of my work is shared on Dribbble, my thoughts on Twitter, and my daily life on Instagram. Find my full resume directly on LinkedIn.</span>,
        ]}
        timeout={800}
      >
        <Profile />
      </Introduction>
      <Introduction
        title="Skills & Experience"
        content={[
          "Strong in design and problem solving skills. Expertise in *nix system and command-line. Fluent in Golang, Javascript, Node.js, PHP, Java and Objective-C. Worked with Etcd, Redis, NSQ, MySQL, RethinkDB, MongoDB and Cassandra. ",
          "Proficient in frontend development with React, Inferno, Mithril, Angular.js and Backbone.js. Experience in Micro-services architecture, Distributed systems and Continuous delivery with Docker and Kubernetes.",
        ]}
        timeout={1000}
      >
        <TimeTravel since={2005} events={skills} />
      </Introduction>
      <Footer />
    </div>
  }

}
