/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 * https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
 */
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {Configs} from "@/core/tools/Configs";

export function createCoreVuetify() {
  return createVuetify(Configs.get('plugins.vuetify'))
}
