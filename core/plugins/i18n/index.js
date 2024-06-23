import Trans from "@/core/tools/Trans";
import {createI18n, useI18n} from "vue-i18n";
import {Utils} from "@/core/tools/Utils";
import {Configs} from "@/core/tools/Configs";

export function createCoreI18n() {

  const i18n = createI18n(Configs.get('plugins.i18n'))

  /**
   * Hook for trans method
   * @return {*}
   */
  Trans.t = function (message, params) {
    try {
      const {t} = useI18n();
      return t(message, params)
    } catch (e) {
      Utils.devLog(e)
      return message;
    }
  }

  return i18n;
}
