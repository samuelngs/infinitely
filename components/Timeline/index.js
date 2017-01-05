
import Inferno from 'inferno';
import Component from 'inferno-component';

import Year from './Year';

import styles from './styles.css';

const defaults = {
  since: new Date().getFullYear() - 1,
  currentYear: new Date().getFullYear(),
  position: 'bottom',
};

export default class Timeline extends Component {

  state = {
    x: 0,
    y: 0,
    dragging: false,
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

  renderYear(year) {
    const { position = defaults.position } = this.props;
    return <Year year={year} position={position} />
  }

  renderYears() {
    const { since = defaults.since } = this.props;
    const from = since < defaults.currentYear ? since : defaults.currentYear - 1;
    const to = defaults.currentYear;
    return [ ...Array(to - from + 1) ].map((_, year) => this.renderYear(from + year));
  }

  render() {
    return <div ref={n => this.node = n} className={styles.root} onMouseDown={::this.onMouseDown} onMouseUp={::this.onMouseUp} onMouseMove={::this.onMouseMove} onMouseOut={::this.onMouseOut}>
      { this.renderYears() }
    </div>
  }

}
