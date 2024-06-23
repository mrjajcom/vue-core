import {version} from '@/../package.json';
import {Configs} from "@/core/tools/Configs";


/**
 * App
 * Used for set and get configs.
 */
export function App() {
}

/**
 * App configs
 * @type {{}}
 */
App._data = {}

/**
 * Set configs
 * @param key
 * @param data
 */
App.set = function (key, data) {
  this._data[key] = data;
}


/**
 * Set configs
 * @param key Nested string with '.', Array or simple key
 * @return *
 */
App.get = function (key) {
  try {
    let data = Configs.data?.app
    data = {...data, ...this._data}
    return data[key];
  } catch (e) {
    console.log(e);
    return null;
  }
}

/**
 * Get request version number
 * @return *
 */
App.version = function () {
  return version;
}

