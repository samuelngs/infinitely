
import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'weave-router';

import Browser from '../../../components/Browser';
import EmojiRain from '../../../components/EmojiRain';

import shot1 from '../../../assets/vaniila/images/IMG_0076.jpg';
import shot2 from '../../../assets/vaniila/images/IMG_0080.jpg';
import shot4 from '../../../assets/vaniila/images/IMG_1132.jpg';
import shot5 from '../../../assets/vaniila/images/IMG_1136.jpg';
import shot6 from '../../../assets/vaniila/images/IMG_1137.jpg';
import shot7 from '../../../assets/vaniila/images/IMG_1148.jpg';
import shot8 from '../../../assets/vaniila/images/IMG_1200.jpg';
import shot9 from '../../../assets/vaniila/images/IMG_1214.jpg';
import shot10 from '../../../assets/vaniila/images/IMG_1239.jpg';
import shot11 from '../../../assets/vaniila/images/IMG_1241.jpg';
import shot12 from '../../../assets/vaniila/images/IMG_1247.jpg';
import shot13 from '../../../assets/vaniila/images/IMG_1249.jpg';

import styles from './styles.css';

function chunkArray(arr, chunkCount) {
  const chunks = [];
  while(arr.length) {
    const chunkSize = Math.ceil(arr.length / chunkCount--);
    const chunk = arr.slice(0, chunkSize);
    chunks.push(chunk);
    arr = arr.slice(chunkSize);
  }
  return chunks;
}

const defaults = {
  string: '',
};

const images = [shot1, shot2, shot8, shot5, shot10, shot12, shot13, shot9, shot6, shot11, shot7, shot4];
const imagesGroups = chunkArray(images, 6);

export default class Hero extends Component {

  state = {
    visible: false,
  }

  componentDidMount() {
    const { timeout = defaults.timeout } = this.props;
    if ( typeof window === 'undefined' ) {
      return false;
    }
    return window.setTimeout(() => {
      this.setState({ visible: true });
    }, timeout);
  }

  shouldComponentUpdate(props, { visible }) {
    const { visible: current } = this.state;
    return current !== visible;
  }

  onClick(e) {
    e.preventDefault && e.preventDefault();
    const { router: { push } } = this.context;
    return push('/vaniila');
  }

  render() {
    const { bg = defaults.string } = this.props;
    const { visible } = this.state;
    return <a href="/vaniila" className={styles.root} onClick={::this.onClick}>
      <div className={styles.cover} data-scroll-section>
        <div className={styles.tiles}>
          {imagesGroups.map((group, i) => (
            <div className={styles.tiles_line} data-scroll data-scroll-speed={i % 2 === 0 ? "-14" : "-7"}>
              {group.map(image => (
                <div className={styles.tiles_line_image} style={{ backgroundImage: `url(${image})` }} />
              ))}
            </div>
          ))}
        </div>
        <h3 className={styles.title} data-scroll>
          <span data-scroll data-scroll-delay="0.63" data-scroll-speed="-6">V</span>
          <span data-scroll data-scroll-delay="0.52" data-scroll-speed="-6">A</span>
          <span data-scroll data-scroll-delay="0.41" data-scroll-speed="-6">N</span>
          <span data-scroll data-scroll-delay="0.30" data-scroll-speed="-6">I</span>
          <span data-scroll data-scroll-delay="0.29" data-scroll-speed="-6">I</span>
          <span data-scroll data-scroll-delay="0.18" data-scroll-speed="-6">L</span>
          <span data-scroll data-scroll-delay="0.10" data-scroll-speed="-6">A</span>
        </h3>
        <EmojiRain active={true} drops={5} />
      </div>
    </a>
  }

}
