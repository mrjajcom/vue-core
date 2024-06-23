import {createCoreVuetify} from "./vuetify";
import {createCoreI18n} from "./i18n";
import {createCoreRouter} from "./router";
import {createCorePinia} from "./pinia";
import {createCoreMoment} from "./moment";


export function registerPlugins(app) {

  app
    .use(createCorePinia())
    .use(createCoreVuetify())
    .use(createCoreRouter())
    .use(createCoreI18n())
    .use(createCoreMoment())

}
