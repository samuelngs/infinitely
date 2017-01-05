
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';
import { Head, Title, Meta } from 'weave-head';

import AnimationFadeIn from '../../components/AnimationFadeIn';
import HeroGrid from '../../components/HeroGrid';
import Introduction from '../../components/Introduction';
import HeroMain from './HeroMain';
import HeroTop from './HeroTop';
import HeroBottom from './HeroBottom';
import Profile from './Profile';
import TimeTravel from './TimeTravel';

export default class Home extends Component {

  render() {
    return <div>
      <Head>
        <Title>Infinitely</Title>
        <Meta name="HandheldFriendly" content="true" />
        <Meta name="MobileOptimized" content="320" />
        <Meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Meta name="description" content="We create elegant and functional custom‑designed websites. Our fine studio of two know the value of hard work." />
      </Head>
      <HeroGrid>
        {() => ({
          main  : <HeroMain effect="blob" title="A full stack developer living in Edmonton, Canada." subtitle={["Develop apps for Web and Mobile with ", <span>♥</span>]} />,
          top   : <HeroTop bg="#edf4ec" />,
          bottom: <HeroBottom bg="#c6e2e9" />,
        })}
      </HeroGrid>
      <Introduction
        title="Who am I"
        content={[
          "I am Sam, a software developer. I studied computer science at Northern Alberta Institute of Technology in Edmonton, Alberta.",
          "I am a highly motivated individual and a team player. I always have a great passion for design and programming.",
        ]}
        timeout={800}
      >
        <Profile />
      </Introduction>
      <Introduction
        title="Skills & Experience"
        content={[
          "Strong in design and problem solving skills. Expertise in *nix system and command-line. Fluent in Golang, Javascript, Node.js, PHP, Java and Objective-C. Worked with MySQL, Redis, RethinkDB, MongoDB and Cassandra. ",
          "Proficient in frontend development using React, Inferno, Mithril and Angular.js. Experience in Micro-services architecture, Distributed systems and Continuous delivery with Docker and Kubernetes.",
        ]}
        timeout={1000}
      >
        <TimeTravel since={2010} />
      </Introduction>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <Link href="/athena">Go to link</Link>
    </div>
  }

}
