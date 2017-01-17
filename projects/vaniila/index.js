
import { create, carousel, showcase, paragraph } from '../template';

import Project from '../../components/Project';

import video1 from '../../assets/vaniila/videos/vaniila-intro.mp4';
import cover1 from '../../assets/vaniila/images/vaniila.jpg';

import image1 from '../../assets/vaniila/images/1.jpg';
import image2 from '../../assets/vaniila/images/2.jpg';
import image3 from '../../assets/vaniila/images/3.jpg';
import image4 from '../../assets/vaniila/images/4.jpg';
import image5 from '../../assets/vaniila/images/5.jpg';
import image6 from '../../assets/vaniila/images/6.jpg';
import image7 from '../../assets/vaniila/images/7.jpg';

export default create().
  setPath('/vaniila').
  setView(Project).
  setHero(null).
  setName('Vaniila').
  setDesc('Vaniila is a unified network to connect remarkable people and ideas. It encourages everyone to spread their passion, engage with the world, and make the impossible happen.').
  setSummary('A unified network to connect remarkable people and ideas').
  setKeys([
    'Vaniila',
    'Community',
    'Network',
    'People',
    'Life',
    'Ideas',
    'Inspire',
    'Learn',
    'Engage',
    'Dots',
  ]).
  setBrand('Vaniila').
  setCreator('Sam Ng').
  setPublisher('vaniila.com').
  setCopyright(true).
  setDate(new Date(2016, 2, 1)).
  addContent('intro', 'Vaniila\'s mission is to connect the dots between people and ideas. It provides tools to create amazing content easy and fun, and connects you to people who have similar interests.').
  addVideo('editor', { desc: 'Vaniila Editor', path: video1, cover: cover1 }).
  addImage('slide1', { desc: 'Vaniila Slide 1', path: image1 }).
  addImage('slide2', { desc: 'Vaniila Slide 2', path: image2 }).
  addImage('login', { desc: 'Vaniila Login', path: image3 }).
  addImage('discover', { desc: 'Vaniila Discover', path: image4 }).
  addImage('integration', { desc: 'Vaniila Editor Integrations', path: image5 }).
  addImage('editor', { desc: 'Vaniila Story Editor', path: image6 }).
  addImage('preview', { desc: 'Vaniila Preview', path: image7 }).
  setTechnologies([
    'Go',
    'Javascript',
    'Node',
    'React',
    'NSQ',
    'Redis',
    'MySQL',
    'RethinkDB',
    'Youtube',
    '500px',
    'Google Cloud',
    'Docker',
  ]).
  setTemplates([
    carousel({ frame: 'screen', media: [
      { type: 'video', src: 'editor' },
    ] }),
    paragraph({ title: 'Application Overview', src: 'content', ref: 'intro' }),
    showcase({ frame: 'desktop', media: [
      { type: 'image', src: 'slide1' },
      { type: 'image', src: 'slide2' },
      { type: 'image', src: 'login' },
      { type: 'image', src: 'discover' },
      { type: 'image', src: 'integration' },
      { type: 'image', src: 'editor' },
      { type: 'image', src: 'preview' },
    ] }),
    paragraph({ title: 'Technologies', src: 'technologies' }),
  ]);

