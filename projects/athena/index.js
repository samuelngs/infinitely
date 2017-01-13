
import { create } from '../template';

import Athena from '../../pages/Athena';

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
  setView(Athena).
  setHero(null).
  setName('Athena').
  setDesc('Customer and provider management console for Yardly, a lawn care & snow removal company located in Edmonton, Canada.').
  setSummary('Customer and provider management console').
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
  addContent('intro', 'Athena allows to manage customer and partner profiles, payment and contact information, monitor providers\' activities, and track visits statuses.').
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
  ]);
