
import styles from './styles.css';

import athena from './athena';
import vaniila from './vaniila';

export const projects = [
  athena,
  vaniila,
];

export const history = projects.map(project => ({
  render  : `${project.base.brand}, ${project.base.name}`,
  url     : project.route.path,
  date    : project.base.date,
  style   : styles.event_base,
}));

export default projects;
