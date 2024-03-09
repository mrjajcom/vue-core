import {createI18n, useI18n} from "vue-i18n";
import {Utils} from "@/tools/Utils";

/**
 * Translate and Multi-lang

 * Used i18n:
 * https://vue-i18n.intlify.dev/guide/
 */

export function Trans() {

}

/**
 * Multi-lang provider
 * @type {null}
 */
Trans.provider = null;

/**
 * Init tools
 * @param app
 * @param configs
 */
Trans.init = function (app, configs) {
  Trans.provider = createI18n(configs)
  app?.use(Trans.provider)
}


/**
 * Get message
 * @param message {string}
 * @param params
 */
Trans.t = function (message, params = null) {
  try {
    const {t} = useI18n();
    return t(message, params)
  } catch (e) {
    Utils.devLog(e)
    return message;
  }
}

export default Trans;
