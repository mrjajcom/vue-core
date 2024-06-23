import {Configs} from "@/core/tools/Configs";

/**
 * Add routes
 */
export function addRoutes(data) {
  Configs.push('plugins.router.routes', data)
}
