
import Inferno from 'inferno';
import Component from 'inferno-component';

import Year from './Year';

import styles from './styles.css';

const defaults = {
  since: new Date().getFullYear() - 1,
  currentYear: new Date().getFullYear(),
  position: 'bottom',
  events: [ ],
};

export default class Timeline extends Component {

  state = {
    x: 0,
    y: 0,
    dragging: false,
  }

  componentDidMount() {
    const { node } = this;
    if ( !node ) {
      return false;
    }
    node.scrollLeft = node.scrollWidth || node.offsetWidth;
  }

  onMouseDown(e) {
    e.preventDefault && e.preventDefault();
    this.state.x = e.pageX;
    this.state.y = e.pageY;
    return this.setState({ dragging: true });
  }

  onMouseUp(e) {
    e.preventDefault && e.preventDefault();
    this.state.x = 0;
    this.state.y = 0;
    return this.setState({ dragging: false });
  }

  onMouseMove(e) {
    const { dragging } = this.state;
    const { node } = this;
    if ( !dragging || !node ) {
      return false;
    }
    const x = e.pageX - this.state.x;
    const y = e.pageY - this.state.y;
    node.scrollLeft -= x;
    node.scrollTop -= y;
    this.state.x = e.pageX;
    this.state.y = e.pageY;
  }

  onMouseOut(e) {
    e.preventDefault && e.preventDefault();
    this.state.x = 0;
    this.state.y = 0;
    return this.setState({ dragging: false });
  }

  events() {
    const { events = defaults.events } = this.props;
    const list = { };
    const count = { };
    for ( const event of events ) {
      const { date } = event;
      if ( !date ) continue;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      count[year] || (count[year] = 0);
      list[year] || (list[year] = {});
      list[year][month] || (list[year][month] = []);
      list[year][month].push({ ...event, n: count[year] });
      count[year]++;
    }
    return list;
  }

  renderYear(year, events) {
    const { position = defaults.position } = this.props;
    return <Year year={year} position={position} events={events} />
  }

  renderYears() {
    const { since = defaults.since } = this.props;
    const events = this.events();
    const from = since < defaults.currentYear ? since : defaults.currentYear - 1;
    const to = defaults.currentYear;
    return [ ...Array(to - from + 1) ].map((_, year) => this.renderYear(from + year, events[from + year]));
  }

  render() {
    const { since, events, position, ...rest } = this.props;
    return <div ref={n => this.node = n} className={styles.root} onMouseDown={::this.onMouseDown} onMouseUp={::this.onMouseUp} onMouseMove={::this.onMouseMove} onMouseOut={::this.onMouseOut} {...rest}>
      { this.renderYears() }
    </div>
  }

}
