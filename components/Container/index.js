
import Inferno from 'inferno';

import Scroller from '../Scroller';
import Fonts from '../Fonts';
import Header from '../Header';

import styles from './styles.css';

export default ({ children }) => <Scroller>
  <Fonts />
  <Header />
  { children }
</Scroller>
