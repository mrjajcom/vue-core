import {Utils} from "@/tools/Utils";

/**
 * Hooks
 * Init hooks for another pipelines and functions
 */
export function Hooks() {
}

/**
 * Init
 * @param app {createApp}
 * @param configs {{init?:function}}
 */
Hooks.init = function (app, configs) {
  try {
    if (!Utils.isFunction(configs?.init)) return;
    configs?.init()
  } catch (e) {
    console.log(e);
  }
}
