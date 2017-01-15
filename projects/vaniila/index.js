
import { create } from '../template';

import Showcase from '../../components/Showcase';

import video1 from '../../assets/vaniila/videos/vaniila-intro.mp4';

import cover1 from '../../assets/vaniila/images/vaniila.jpg';

export default create().
  setPath('/vaniila').
  setView(Showcase).
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
  setDate(new Date(2016, 4, 1)).
  addContent('intro', 'Vaniila\'s mission is to connect the dots between people and ideas. We provide tools to create amazing content easy and fun, and connect you to people who have similar interests.').
  addVideo('editor', { desc: 'Vaniila Editor', path: video1, cover: cover1 }).
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
  ]);

