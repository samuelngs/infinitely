
import Inferno from 'inferno';

import Scroller from '../Scroller';
import Fonts from '../Fonts';
import Header from '../Header';
import Footer from '../Footer';

import styles from './styles.css';

export default ({ children }) => <Scroller>
  <Fonts />
  <Header />
  { children }
  <Footer />
</Scroller>
