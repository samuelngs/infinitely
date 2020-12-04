
import { create, carousel, showcase, paragraph } from '../template';

import Hero from './Hero';
import Project from '../../components/Project';

import shot1 from '../../assets/vaniila/images/screenshot-1.jpg';
import shot2 from '../../assets/vaniila/images/screenshot-2.jpg';
import shot3 from '../../assets/vaniila/images/screenshot-3.jpg';
import shot4 from '../../assets/vaniila/images/IMG_0076.jpg';
import shot5 from '../../assets/vaniila/images/IMG_0080.jpg';
import shot6 from '../../assets/vaniila/images/IMG_0118.jpg';
import shot8 from '../../assets/vaniila/images/IMG_1132.jpg';
import shot9 from '../../assets/vaniila/images/IMG_1136.jpg';
import shot10 from '../../assets/vaniila/images/IMG_1137.jpg';
import shot11 from '../../assets/vaniila/images/IMG_1148.jpg';
import shot12 from '../../assets/vaniila/images/IMG_1200.jpg';
import shot13 from '../../assets/vaniila/images/IMG_1214.jpg';
import shot14 from '../../assets/vaniila/images/IMG_1239.jpg';
import shot15 from '../../assets/vaniila/images/IMG_1241.jpg';
import shot16 from '../../assets/vaniila/images/IMG_1247.jpg';
import shot17 from '../../assets/vaniila/images/IMG_1249.jpg';

export default create().
  setPath('/vaniila').
  setView(Project).
  setHero(Hero).
  setName('Vaniila').
  setDesc('Vaniila is a social interactive platform that allows you to capture your adventures of your daily life, awesome events, or just about anything you want to share. Discover things you are passionate about and interact with users around the world.').
  setSummary('Tell amazing stories. Share awesome moments').
  setKeys([
    'Vaniila',
    'live blogging',
    'stories',
    'moments',
    'sharing',
    'streaming',
  ]).
  setBrand('Vaniila').
  setCreator('Sam Ng').
  setPublisher('vaniila.com').
  setCopyright(true).
  setDate(new Date(2017, 12, 1)).
  addContent('intro', 'Concentrated Your audience no longer needs to flip between your Twitter feed for live blogging and your Instagram account for slides and stories. On Vaniila all of your content beautifully presented in one place').
  addImage('phone-1', { desc: 'Capture', path: shot4 }).
  addImage('phone-2', { desc: 'Capture', path: shot5 }).
  addImage('phone-3', { desc: 'Capture', path: shot6 }).
  addImage('phone-5', { desc: 'Capture', path: shot8 }).
  addImage('phone-6', { desc: 'Capture', path: shot9 }).
  addImage('phone-7', { desc: 'Capture', path: shot10 }).
  addImage('phone-8', { desc: 'Capture', path: shot11 }).
  addImage('phone-9', { desc: 'Capture', path: shot12 }).
  addImage('phone-10', { desc: 'Capture', path: shot13 }).
  addImage('phone-11', { desc: 'Capture', path: shot14 }).
  addImage('phone-12', { desc: 'Capture', path: shot15 }).
  addImage('phone-13', { desc: 'Capture', path: shot16 }).
  addImage('phone-14', { desc: 'Capture', path: shot17 }).
  addImage('home', { desc: 'Home', path: shot1 }).
  addImage('moment-text', { desc: 'Moment with Text', path: shot2 }).
  addImage('moment-photo', { desc: 'Moment with Photo', path: shot3 }).
  setTechnologies([
    'Microservices architecture',
    'Protocol Buffers',
    'Go',
    'Javascript',
    'React',
    'Kafka',
    'Cassandra',
    'Google Cloud',
    'Docker',
    'Kubernetes',
    'Tensorflow',
  ]).
  setTemplates([
    showcase({ frame: 'iphone', media: [
      { type: 'image', src: 'phone-10' },
      { type: 'image', src: 'phone-14' },
      { type: 'image', src: 'phone-12' },
      { type: 'image', src: 'phone-13' },
      { type: 'image', src: 'phone-9' },
      { type: 'image', src: 'phone-2' },
      { type: 'image', src: 'phone-1' },
      { type: 'image', src: 'phone-5' },
      { type: 'image', src: 'phone-6' },
      { type: 'image', src: 'phone-7' },
      { type: 'image', src: 'phone-8' },
    ] }),
    paragraph({ title: 'Application Overview', src: 'content', ref: 'intro' }),
    showcase({ frame: 'desktop', media: [
      { type: 'image', src: 'home' },
      { type: 'image', src: 'moment-text' },
      { type: 'image', src: 'moment-photo' },
    ] }),
    paragraph({ title: 'Technologies', src: 'technologies' }),
  ]);
