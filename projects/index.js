
import styles from './styles.css';

import athena from './athena';

export const projects = [
  athena,
];

export const history = projects.map(project => ({
  render  : `${project.base.brand}, ${project.base.name}`,
  date    : project.base.date,
  style   : styles.event_base,
}));

export default projects;
