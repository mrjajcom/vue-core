import {registerModules} from "./modules";
import {Configs} from "@/core/tools/Configs";
import {registerPlugins} from "@/core/plugins";

import('./assets/css/general.css')

/**
 * Init core
 */
export async function initCore(app, configs) {
    Configs.init(configs)
    registerModules(app)
    registerPlugins(app)
}
