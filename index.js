
import Inferno from 'inferno';
import { Router, Route } from 'weave-router';

import Reducer from './reducers';
import Container from './components/Container';

import Redirect from './pages/Redirect';
import Home from './pages/Home';
import Athena from './pages/Athena';

import pages from './projects';

export default () => <Router reducers={Reducer} offline={false}>
  <Route component={Container}>
    <Route path="/" component={Home} />
    { pages.map( page => <Route path={ page.route.path } component={ page.render({ pages }) } /> ) }
  </Route>
  <Route path="*" component={Redirect} />
</Router>
