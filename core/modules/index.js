import {Utils} from "@/core/tools/Utils";
import {Configs} from "@/core/tools/Configs";

/**
 * Init modules
 * @param app
 */
export function registerModules(app) {
  try {
    for (const module of Configs.data.modules) {
      if (module?.init) module.init(app)
    }
  } catch (e) {
    Utils.devLog(e)
  }
}
