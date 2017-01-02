
import Inferno from 'inferno';
import { Router, Route } from 'weave-router';

import Container from './components/Container';

import Redirect from './pages/Redirect';
import Home from './pages/Home';
import Athena from './pages/Athena';

export default () => <Router>
  <Route component={Container}>
    <Route path="/" component={Home} />
    <Route path="/athena" component={Athena} />
  </Route>
  <Route path="*" component={Redirect} />
</Router>
