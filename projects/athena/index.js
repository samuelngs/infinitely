
import { create, carousel, showcase, paragraph } from '../template';

import Hero from './Hero';
import Project from '../../components/Project';

import video1 from '../../assets/athena/videos/athena-large-login.mp4';
import video2 from '../../assets/athena/videos/athena-large-user.mp4';
import video3 from '../../assets/athena/videos/athena-large-map.mp4';
import video4 from '../../assets/athena/videos/athena-large-services.mp4';

import cover1 from '../../assets/athena/images/athena-large-login.jpg';
import cover2 from '../../assets/athena/images/athena-large-user.jpg';
import cover3 from '../../assets/athena/images/athena-large-map.jpg';
import cover4 from '../../assets/athena/images/athena-large-services.jpg';

import shot1 from '../../assets/athena/images/athena-shot-01.jpg';
import shot2 from '../../assets/athena/images/athena-shot-02.jpg';
import shot3 from '../../assets/athena/images/athena-shot-03.jpg';
import shot4 from '../../assets/athena/images/athena-shot-04.jpg';
import shot5 from '../../assets/athena/images/athena-shot-05.jpg';
import shot6 from '../../assets/athena/images/athena-shot-06.jpg';

export default create().
  setPath('/athena').
  setView(Project).
  setHero(Hero).
  setName('Athena Δ').
  setDesc('The customer and provider management console for Yardly, a lawn care & snow removal company located in Edmonton, Canada.').
  setSummary('Manage service providers and customers with ease').
  setKeys([
    'Athena',
    'Yardly',
    'customer',
    'providers',
    'lawn care',
    'snow removal',
    'management',
    'console',
  ]).
  setBrand('Yardly').
  setCreator('Sam Ng').
  setPublisher('infinitely.io').
  setCopyright(true).
  setDate(new Date(2016, 8, 1)).
  addContent('intro', 'Athena helps Yardly to manage customer and partner profiles, payment and contact information, monitor providers\' activities, and track visits statuses.').
  addVideo('login', { desc: 'Athena Login', path: video1, cover: cover1 }).
  addVideo('people', { desc: 'Athena People', path: video2, cover: cover2 }).
  addVideo('map', { desc: 'Athena Map', path: video3, cover: cover3 }).
  addVideo('services', { desc: 'Athena Services', path: video4, cover: cover4 }).
  addImage('profile', { desc: 'Athena User Profile', path: shot1 }).
  addImage('payment', { desc: 'Athena User Payments', path: shot2 }).
  addImage('remove-payment', { desc: 'Athena Remove Payment', path: shot3 }).
  addImage('direction', { desc: 'Athena Direction', path: shot4 }).
  addImage('expressions', { desc: 'Athena Expressions', path: shot5 }).
  addImage('composer', { desc: 'Athena Expression Composer', path: shot6 }).
  setTechnologies([
    'Microservices architecture',
    'Protocol Buffers',
    'Go',
    'Javascript',
    'React',
    'NSQ',
    'Redis',
    'Cassandra',
    'Open Data',
    'Stripe Payment',
    'Twilio Messaging',
    'Google Cloud',
    'Docker',
    'Kubernetes',
  ]).
  setTemplates([
    carousel({ frame: 'screen', media: [
      { type: 'video', src: 'login' },
      { type: 'video', src: 'people' },
      { type: 'video', src: 'map' },
      { type: 'video', src: 'services' },
    ] }),
    paragraph({ title: 'Application Overview', src: 'content', ref: 'intro' }),
    showcase({ frame: 'desktop', media: [
      { type: 'image', src: 'profile' },
      { type: 'image', src: 'payment' },
      { type: 'image', src: 'remove-payment' },
      { type: 'image', src: 'direction' },
      { type: 'image', src: 'expressions' },
      { type: 'image', src: 'composer' },
    ] }),
    paragraph({ title: 'Technologies', src: 'technologies' }),
  ]);
