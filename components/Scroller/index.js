
import Inferno from 'inferno';
import Component from 'inferno-component';

export default class Scroller extends Component {

  constructor(props, context) {
    super(props, context);
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    const { store: { dispatch } } = this.context;
    dispatch(this.change());
    this.attach();
  }

  componentWillUnmount() {
    const { store: { dispatch } } = this.context;
    dispatch(this.change());
    this.detach();
  }

  attach() {
    if ( this.event ) { return };
    window.addEventListener('scroll', this.handler);
    return this.event = true;
  }

  detach() {
    if ( !this.event ) { return };
    window.removeEventListener('scroll', this.handler);
    return this.event = null;
  }

  change() {
    const doc = document.documentElement;
    const x = ((window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)) || 0;
    const y = ((window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)) || 0;
    return { type: 'WEAVE_POSITION_CHANGED', x, y }
  }

  handler(e) {
    const { store: { dispatch } } = this.context;
    dispatch(this.change());
  }

  render({ children }) {
    return <div>{ children }</div>
  }

}
