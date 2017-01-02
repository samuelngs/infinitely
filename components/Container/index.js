
import Inferno from 'inferno';

import Fonts from '../Fonts';
import Header from '../Header';
import Footer from '../Footer';

import styles from './styles.css';

export default ({ children }) => <div>
  <Fonts />
  <Header />
  { children && <div>{ children }</div> }
  <Footer />
</div>
