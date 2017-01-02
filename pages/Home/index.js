
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Link } from 'weave-router';
import { Head, Title, Meta } from 'weave-head';

import AnimationFadeIn from '../../components/AnimationFadeIn';
import HeroGrid from '../../components/HeroGrid';
import HeroMain from './HeroMain';
import HeroTop from './HeroTop';
import HeroBottom from './HeroBottom';

export default class Home extends Component {

  render() {
    return <div>
      <Head>
        <Title>Infinitely</Title>
        <Meta name="HandheldFriendly" content="true" />
        <Meta name="MobileOptimized" content="320" />
        <Meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Meta name="description" content="We create elegant and functional custom‑designed websites. Our fine studio of two know the value of hard work." />
      </Head>
      <HeroGrid>
        {() => ({
          main  : <HeroMain effect="blob" title="A full stack developer living in Edmonton, Canada." subtitle={["Develop apps for Web and Mobile with ", <span>♥</span>]} />,
          top   : <HeroTop bg="#edf4ec" />,
          bottom: <HeroBottom bg="#c6e2e9" />,
        })}
      </HeroGrid>
      <Link href="/athena">Go to link</Link>
    </div>
  }

}
