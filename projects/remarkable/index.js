
import { create, carousel, showcase, paragraph } from '../template';

import Hero from './Hero';
import Project from '../../components/Project';

import video1 from '../../assets/remarkable/videos/remarkable-intro.mp4';
import cover1 from '../../assets/remarkable/images/remarkable.jpg';

import image1 from '../../assets/remarkable/images/1.jpg';
import image2 from '../../assets/remarkable/images/2.jpg';
import image3 from '../../assets/remarkable/images/3.jpg';
import image4 from '../../assets/remarkable/images/4.jpg';
import image5 from '../../assets/remarkable/images/5.jpg';
import image6 from '../../assets/remarkable/images/6.jpg';
import image7 from '../../assets/remarkable/images/7.jpg';

export default create().
  setPath('/remarkable').
  setView(Project).
  setHero(Hero).
  setName('Remarkable').
  setDesc('Remarkable is a unified network to connect remarkable people and ideas. It encourages people to spread their passion, engage with the world, and make the impossible happen.').
  setSummary('A unified network to connect remarkable people and ideas').
  setKeys([
    'Remarkable',
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
  setBrand('Remarkable').
  setCreator('Sam Ng').
  setPublisher('remarkable.com').
  setCopyright(true).
  setDate(new Date(2016, 2, 1)).
  addContent('intro', 'Remarkable helps to connect the dots between people and ideas. It provides tools to create amazing content with ease and fun, and connects you to others who share similar interests.').
  addVideo('editor', { desc: 'Remarkable Editor', path: video1, cover: cover1 }).
  addImage('slide1', { desc: 'Remarkable Slide 1', path: image1 }).
  addImage('slide2', { desc: 'Remarkable Slide 2', path: image2 }).
  addImage('login', { desc: 'Remarkable Login', path: image3 }).
  addImage('discover', { desc: 'Remarkable Discover', path: image4 }).
  addImage('integration', { desc: 'Remarkable Editor Integrations', path: image5 }).
  addImage('editor', { desc: 'Remarkable Story Editor', path: image6 }).
  addImage('preview', { desc: 'Remarkable Preview', path: image7 }).
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

