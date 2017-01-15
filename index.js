
import Inferno from 'inferno';
import { Router, Route } from 'weave-router';

import Reducer from './reducers';
import Container from './components/Container';

import Redirect from './pages/Redirect';
import Home from './pages/Home';
import Athena from './pages/Athena';

import pages, { history } from './projects';

export default () => <Router reducers={Reducer} offline={false} ga="UA-90337948-1">
  <Route component={Container}>
    <Route path="/" component={Home} />
    { pages.map( page => <Route path={ page.route.path } component={ page.render({ pages, history }) } /> ) }
  </Route>
  <Route path="*" component={Redirect} />
</Router>
