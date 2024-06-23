import {Utils} from "@/core/tools/Utils";
import {Nested} from "@/core/tools/Nested";

export function Configs() {
}

/**
 * Data
 * @type {{}}
 */
Configs.data = {

  /**
   * App configs
   */
  app: {
    name: null,
    logo: null,
  },

  /**
   * Users configs
   */
  users: {
    roles: {},
  },

  /**
   * Urls configs
   */
  urls: {
    api_base_url: null,
    dev_api_base_url: null,
  },

  /**
   * Plugins
   */
  plugins: {},

  /**
   * Modules
   */
  modules: [],

  /**
   * Router routes
   */
  routes: {},

  /**
   * Lang messages
   */
  messages: {}
}

/**
 * Init
 * @param data
 */
Configs.init = function (data) {
  this.data = data;
}

/**
 * Get config
 * @param key
 * @param default_value
 * @return {*|null}
 */
Configs.get = function (key, default_value = null) {
  try {
    const result = Nested.get(this.data, key)
    if (!result) return default_value;
    return result;
  } catch (e) {
    Utils.devLog(e)
    return null;
  }
}


/**
 * Set configs
 * @param key
 * @param data
 */
Configs.set = function (key, data) {
  return Nested.set(this.data, key, data)
}


/**
 * Merge configs
 * @param key
 * @param data
 */
Configs.push = function (key, data) {
  try {
    const value = this.get(key)
    if (Utils.isArray(value)) {
      value.push(...data)
      data = value;
    }
    return Nested.set(this.data, key, data)
  } catch (e) {
    Utils.devLog(e)
  }
}
 

