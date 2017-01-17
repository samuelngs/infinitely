
import createElement from 'inferno-create-element';

const defaults = {
  string: '',
  number: 0.0,
  object: { },
  array : [ ],
  bool  : false,
  date  : new Date(),
  func  : () => null,
  nil   : null,
};

const video = {
  desc        : defaults.string,
  path        : defaults.string,
  type        : defaults.string,
  bg          : defaults.string,
  cover       : defaults.string,
  autoplay    : defaults.bool,
};

const image = {
  desc        : defaults.string,
  path        : defaults.string,
  type        : defaults.string,
  bg          : defaults.string,
};

const meta = [
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  { name: 'HandheldFriendly', content: 'true' },
  { name: 'MobileOptimized', content: '320' },
  { name: 'viewport', content: [
    'initial-scale=1.0',
    'minimum-scale=1.0',
    'maximum-scale=1.0',
    'user-scalable=no'
  ].join(', ') },
  { name: 'referrer', content: 'origin-when-cross-origin' },
  { name: 'distribution', content: 'Global' },
  { name: 'rating', content: 'General' },
  { name: 'robots', content: 'index, follow' },
];

const base = {
  name        : defaults.string,
  desc        : defaults.string,
  summary     : defaults.string,
  keys        : defaults.array,
  brand       : defaults.string,
  creator     : defaults.string,
  publisher   : defaults.string,
  copyright   : defaults.bool,
  date        : defaults.date,
};

const assets = {
  videos      : defaults.object,
  images      : defaults.object,
  content     : defaults.object,
  technologies: defaults.array,
  templates   : defaults.array,
};

const route = {
  path        : defaults.string,
  view        : defaults.func,
  hero        : defaults.nil,
};

const core = {
  base,
  assets,
  route,
};

export default class Template {

  meta    = [ ...meta ];
  base    = { ...base };
  assets  = { ...assets };
  route   = { ...route };

  setPath(v = defaults.string) { this.route.path = v; return this; }
  setView(v = defaults.nil) { this.route.view = v; return this; }
  setHero(v = defaults.nil) { this.route.hero = v; return this; }

  setName(s = defaults.string) { this.base.name = s; return this; }
  setDesc(s = defaults.string) { this.base.desc = s; return this; }
  setSummary(s = defaults.string) { this.base.summary = s; return this; }
  setKeys(a = defaults.array) { this.base.keys = a; return this; }
  setBrand(s = defaults.string) { this.base.brand = s; return this; }
  setCreator(s = defaults.string) { this.base.creator = s; return this; }
  setPublisher(s = defaults.string) { this.base.publisher = s; return this; }
  setCopyright(b = defaults.bool) { this.base.copyright = !!b; return this; }
  setDate(d = defaults.date) { this.base.date = d; return this; }

  setVideo(k = defaults.string, v = defaults.object) { this.assets.videos = v; return this; }
  addVideo(k = defaults.string, v = video) { this.assets.videos = { ...this.assets.videos, [k]: { ...video, ...v } }; return this; }

  setImage(k = defaults.string, v = defaults.object) { this.assets.images = v; return this; }
  addImage(k = defaults.string, v = image) { this.assets.images = { ...this.assets.images, [k]: { ...image, ...v } }; return this; }

  setContent(k = defaults.string, v = defaults.object) { this.assets.content = v; return this; }
  addContent(k = defaults.string, v = defaults.string) { this.assets.content = { ...this.assets.content, [k]: v }; return this; }

  setTechnologies(v = defaults.array) { this.assets.technologies = v; return this; }
  addTechnology(v = defaults.string) { this.assets.technologies = [ ...this.assets.technologies, v ]; return this; }

  setTemplates(v = defaults.array) { this.assets.templates = v; return this; }
  addTemplate(v = defaults.string) { this.assets.templates = [ ...this.assets.templates, v ]; return this; }

  render(props = defaults.object) {
    return () => {
      const { meta, base, assets, route } = this;
      const { view } = route;
      if (view) {
        return createElement(view, { ...props, page: { meta, base, assets, route } });
      }
      return defaults.nil;
    }
  }

};

export { carousel, showcase, paragraph } from './modules.js';

export function create () {
  return new Template();
}
