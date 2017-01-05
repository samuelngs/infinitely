
import Inferno from 'inferno';
import Component from 'inferno-component';

import Month from '../Month';

import styles from './styles.css';

const defaults = {
  year: '20XX',
  position: 'bottom',
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default class Year extends Component {

  renderMonths() {
    const { year = defaults.year, position = defaults.position } = this.props;
    return months.map((month, i) => <Month number={i + 1} month={month} year={year} position={position} />);
  }

  render() {
    const { year = defaults.year } = this.props;
    return <div className={styles.root}>
      <div className={styles.year}>
        <div className={styles.line} />
        <span>{ year }</span>
      </div>
      { this.renderMonths() }
    </div>
  }

}
