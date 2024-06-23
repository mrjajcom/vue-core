import {Utils} from "./Utils";
import {Configs} from "@/core/tools/Configs";

/**
 * Urls Class
 * this class handle all urls and apis address
 */
export function Urls() {
  //
}

/**
 * Get urls config
 * @return {*|null}
 */
Urls.getConfig = function (key = null) {
  try {
    if (!key) return Configs.get('urls')
    return Configs.get('urls')?.[key]
  } catch (e) {
    Utils.devLog(e)
    return null;
  }
}

/**
 * Urls request with base url
 * @param api_key
 * @param parameters
 * @returns {*}
 */
Urls.api = function (api_key = null, parameters = []) {

  const dev_base_url = Urls.getConfig('dev_api_base_url');
  const base = Utils.isDev() && dev_base_url ? dev_base_url : Urls.getConfig('api_base_url');

  if (!api_key) return base;
  if (!Urls.getConfig(api_key)) return null;
  return base + this.url(api_key, parameters);
}

/**
 * Get url without base url
 */
Urls.url = function (key, parameters = []) {
  try {
    if (!Array.isArray(parameters)) parameters = [];
    let url = Urls.getConfig(key);
    if (parameters.length !== 0) url = Utils.setStringParameters(url, parameters);
    return url ?? '';
  } catch (e) {
    Utils.devLog(e)
    return '';
  }
}
