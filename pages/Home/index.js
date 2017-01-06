
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

import styles from './styles.css';

const skills = [
  { render: 'HTML 4', style: styles.skill_html, date: new Date(2005, 4, 1) },
  { render: 'CSS 2.1', style: styles.skill_css, date: new Date(2005, 5, 1) },
  { render: 'Javascript ECMAScript 3', style: styles.skill_js, date: new Date(2005, 10, 1) },
  { render: 'Java 6', style: styles.skill_java, date: new Date(2006, 11, 1) },
  { render: 'Spring Framework', style: styles.skill_spring_framework, date: new Date(2006, 11, 1) },
  { render: 'C', style: styles.skill_c, date: new Date(2007, 6, 1) },
  { render: 'C++', style: styles.skill_cpp, date: new Date(2007, 8, 1) },
  { render: 'Assembly', style: styles.skill_assembly, date: new Date(2007, 8, 1) },
  { render: 'Linux', style: styles.skill_linux, date: new Date(2008, 3, 1) },
  { render: 'Networking and Security', style: styles.skill_nas, date: new Date(2008, 5, 1) },
  { render: 'Objective-C', style: styles.skill_objc, date: new Date(2009, 1, 1) },
  { render: 'HTML 5', style: styles.skill_html, date: new Date(2010, 0, 1) },
  { render: 'CSS 3', style: styles.skill_css, date: new Date(2010, 0, 1) },
  { render: 'Android Development', style: styles.skill_android, date: new Date(2010, 2, 1) },
  { render: 'Node.js', style: styles.skill_js, date: new Date(2011, 0, 1) },
  { render: 'PHP 5', style: styles.skill_php, date: new Date(2011, 1, 1) },
  { render: 'MySQL', style: styles.skill_mysql, date: new Date(2011, 1, 1) },
  { render: 'Northern Alberta Institute of Technology', style: styles.skill_nait, date: new Date(2013, 5, 1) },
  { render: 'Docker', style: styles.skill_docker, offset: 1, date: new Date(2014, 2, 1) },
  { render: 'Websocket', style: styles.skill_web, date: new Date(2014, 8, 1) },
  { render: 'Mithril', style: styles.skill_web, date: new Date(2014, 9, 1) },
  { render: 'Angular.js', offset: -1, style: styles.skill_web, date: new Date(2014, 3, 1) },
  { render: 'RethinkDB', offset: 1, style: styles.skill_rethinkdb, date: new Date(2013, 10, 1) },
  { render: 'CoreOS', offset: -4, style: styles.skill_os, date: new Date(2014, 11, 1) },
  { render: 'Etcd', style: styles.skill_etcd, date: new Date(2015, 6, 1) },
  { render: 'MongoDB', style: styles.skill_mongodb, date: new Date(2015, 3, 1) },
  { render: 'Redis', style: styles.skill_redis, date: new Date(2015, 1, 1) },
  { render: 'Golang', offset: -1, style: styles.skill_go, date: new Date(2015, 7, 1) },
  { render: 'NSQ', offset: -3, style: styles.skill_nsq, date: new Date(2015, 10, 1) },
  { render: 'Backbone.js', style: styles.skill_backbone, date: new Date(2016, 0, 1) },
  { render: 'Javascript ECMAScript 6', style: styles.skill_js, date: new Date(2016, 1, 1) },
  { render: 'React.js', style: styles.skill_reactjs, date: new Date(2016, 1, 1) },
  { render: 'Microservices architecture', offset: -3, style: styles.skill_microservices, date: new Date(2016, 7, 1) },
  { render: 'Kubernetes', offset: -2, style: styles.skill_kubernetes, date: new Date(2016, 9, 1) },
  { render: 'Inferno', offset: 1, style: styles.skill_inferno, date: new Date(2017, 1, 1) },
];

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
      <HeroGrid showcases={true}>
        {() => ({
          main  : <HeroMain effect="blob" title="A full stack developer living in Edmonton, Canada." subtitle={["Develop apps for Web and Mobile with ", <span>♥</span>]} />,
          // top   : <HeroTop />,
          // bottom: <HeroBottom />,
          top   : <HeroTop bg="#edf4ec" />,
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
