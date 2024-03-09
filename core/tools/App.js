import {Urls} from "./Urls";
import Trans from "./Trans";
import {version} from '../../package.json';
import {Hooks} from "@/tools/Hooks";
import {Messages} from "@/tools/Messages";


/**
 * App
 * Used for set and get configs.
 * @constructor
 */
export function App() {
}

/**
 * All configs
 * @type {{}}
 */
App.data = {
  // ...
}

/**
 * Default request configs
 * @type {{request: {name: string}, urls: {base_url: string}}}
 */
App.default_configs = {
  app: {
    name: 'My Application',
  },

  urls: {
    base_url: '...'
  }
}

/**
 * Init tools
 * @param app {createApp}
 * @param configs {{request?: *, urls?: *}}
 */
App.init = function (app, configs) {
  const options = {...this.default_configs, ...configs};
  this.data = options?.app;

  // Init tools
  Urls.init(app, options?.urls)
  Trans.init(app, options?.trans)
  Hooks.init(app, options?.hooks)
}

/**
 * Set configs
 * @param key
 * @param data
 */
App.set = function (key, data) {
  this.data[key] = data;
}


/**
 * Set configs
 * @param key Nested string with '.', Array or simple key
 * @return *
 */
App.get = function (key) {
  return this.data[key];
}

/**
 * Get request version number
 * @return *
 */
App.version = function () {
  return version;
}

