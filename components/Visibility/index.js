
import Inferno from 'inferno';
import Component from 'inferno-component';

const defaults = {
  string: '',
  state: {
    isVisible: null,
    visibilityRect: { },
  },
  props: {
    active: true,
    partialVisibility: true,
    minTopValue: 0,
    scrollCheck: true,
    scrollDelay: 250,
    intervalCheck: false,
    intervalDelay: 1200,
    delayedCall: false,
    containment: null,
    onChange: () => { },
  },
};

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default class Visibility extends Component {

  state = {
    ...defaults.state,
  }

  componentDidMount() {
    const { active = defaults.props.active } = this.props;
    this.check = this.check.bind(this);
    this.startWatching = this.startWatching.bind(this);
    this.stopWatching = this.stopWatching.bind(this);
    if ( active ) {
      this.startWatching();
    }
  }

  componentWillUnmount() {
    this.stopWatching();
  }

  componentWillReceiveProps({ active = defaults.props.active }) {
    const { active: current = defaults.props.active } = this.props;
    if ( !current && active ) {
      this.setState(defaults.state);
      this.startWatching();
    }
    if ( current && !active ) {
      this.stopWatching();
    }
  }

  getContainer() {
    return window;
  }

  startWatching() {
    const {
      delayedCall = defaults.props.delayedCall,
      intervalCheck = defaults.props.intervalCheck,
      intervalDelay = defaults.props.intervalDelay,
      scrollCheck = defaults.props.scrollCheck,
      scrollDelay = defaults.props.scrollDelay,
    } = this.props;
    if (this.debounceCheck || this.interval) { return; }
    if (intervalCheck) {
      this.interval = setInterval(this.check, intervalDelay);
    }
    if (scrollCheck) {
      this.debounceCheck = debounce(this.check, scrollDelay);
      this.getContainer().addEventListener('scroll', this.debounceCheck);
    }
    !delayedCall && this.check();
  }

  stopWatching() {
    if (this.debounceCheck) { this.getContainer().removeEventListener('scroll', this.debounceCheck); }
    if (this.interval) { this.interval = clearInterval(this.interval); }
  }

  check() {
    let rect, containmentRect;
    const { node: el, state } = this;
    const {
      onChange = defaults.props.onChange,
      minTopValue = defaults.props.minTopValue,
      containment = defaults.props.containment,
      partialVisibility = defaults.props.partialVisibility,
    } = this.props;
    if  ( !el ) {
      return state
    };
    rect = el.getBoundingClientRect();
    if (containment) {
      containmentRect = containment.getBoundingClientRect();
    } else {
      containmentRect = { top: 0, left: 0, bottom: window.innerHeight || document.documentElement.clientHeight, right: window.innerWidth || document.documentElement.clientWidth };
    }
    const visibilityRect = {
      top: rect.top >= containmentRect.top,
      left: rect.left >= containmentRect.left,
      bottom: rect.bottom <= containmentRect.bottom,
      right: rect.right <= containmentRect.right
    };
    let isVisible = (
      visibilityRect.top &&
      visibilityRect.left &&
      visibilityRect.bottom &&
      visibilityRect.right
    );
    if (partialVisibility) {
      let partialVisible =
          rect.top <= containmentRect.bottom && rect.bottom >= containmentRect.top &&
          rect.left <= containmentRect.right && rect.right >= containmentRect.left;
      if (typeof partialVisibility === 'string') {
        partialVisible = visibilityRect[partialVisibility]
      }
      isVisible = minTopValue
        ? partialVisible && rect.top <= (containmentRect.bottom - minTopValue)
        : partialVisible
    }
    if (state.isVisible !== isVisible) {
      this.setState({
        isVisible: isVisible,
        visibilityRect: visibilityRect
      });
      onChange && onChange(isVisible, visibilityRect);
    }
    return state;
  }

  render({ className = defaults.string, children }) {
    return <div ref={n => this.node = n} className={className}>{ children }</div>;
  }

}
