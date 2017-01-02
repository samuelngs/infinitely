
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';
import { Head, Title, Meta } from 'weave-head';

export default class Athena extends Component {

  render() {
    return <div>
      <Head>
        <Title>Athena | Infinitely</Title>
        <Meta name="HandheldFriendly" content="true" />
        <Meta name="MobileOptimized" content="320" />
        <Meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Link href="/">Go to home</Link>
    </div>
  }

}

