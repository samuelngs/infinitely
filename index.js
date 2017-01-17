
import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import { Router, Route } from 'weave-router';

import Reducer from './reducers';
import Container from './components/Container';

import Redirect from './pages/Redirect';
import Home from './pages/Home';
import Athena from './pages/Athena';

import pages, { history } from './projects';

function robots (ctx) {
  const { location: { hostname } } = ctx;
  return `Sitemap: https://${ hostname }/sitemap.xml`;
}

function sitemap (ctx) {
  const { location: { hostname } } = ctx;
  const sm = renderToString(<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    <url>
      <loc>https://{ hostname }/</loc>
    </url>
    { pages.map(({ route: { path }, assets: { images, videos } }) => <url>
      <loc>https://{ hostname }{ path }</loc>
      { Object.keys(images).length > 0 && Object.keys(images).map(ref => {
        const { path, desc } = images[ref];
        return <image-image>
          <image-loc>https://{ hostname }{ path }</image-loc>
          <image-caption>{ desc }</image-caption>
        </image-image>
      }) }
      { Object.keys(images).length > 0 && Object.keys(images).map(ref => {
        const { path, desc } = images[ref];
        return <image-image>
          <image-loc>https://{ hostname }{ path }</image-loc>
          { desc && <image-caption>{ desc }</image-caption> }
        </image-image>
      }) }
      { Object.keys(videos).length > 0 && Object.keys(videos).map(ref => {
        const { path, cover, desc } = videos[ref];
        return <video-video>
          <video-content_loc>https://{ hostname }{ path }</video-content_loc>
          { cover && <video-thumbnail_loc>https://{ hostname }{ cover }</video-thumbnail_loc> }
          { desc && <video-title>{ desc }</video-title> }
        </video-video>
      }) }
    </url>) }
  </urlset>)
  return `<?xml version="1.0" encoding="UTF-8"?>${sm}`.
    replace(/image-/g, 'image:').
    replace(/video-/g, 'video:').
    replace(/<!---->/g, '');
}

export default () => <Router reducers={Reducer} offline={false} ga="UA-90337948-1" robots={robots} sitemap={sitemap}>
  <Route component={Container}>
    <Route path="/" component={Home} />
    { pages.map( page => <Route path={ page.route.path } component={ page.render({ pages, history }) } /> ) }
  </Route>
  <Route path="*" component={Redirect} />
</Router>
