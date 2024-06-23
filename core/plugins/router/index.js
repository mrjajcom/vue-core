import {createRouter, createWebHistory} from "vue-router";
import {Auth} from "../../tools/Auth";
import {Configs} from "../../tools/Configs";
import {Utils} from "../../tools/Utils";

export function createCoreRouter() {
  const router = createRouter({
    history: createWebHistory(),
    routes: Configs.get('plugins.router.routes'),
  })

  router.beforeEach((to) => {

    // Need account
    if (to.meta?.auth && !Auth.isLogin()) {
      let route = Configs.get('plugins.router.auth.login_route', {name: 'Auth'});
      if (!route) route = {name: 'Auth'};
      route.query = {redirect: to?.fullPath};
      return route
    }

    // Roles
    if (Utils.isFunction(to.meta?.roles)) {
      if (!to.meta?.roles()) return {path: '/',};
    }

    if (to.meta?.guest && Auth.isLogin()) {
      let route = Configs.get('plugins.router.auth.home_route');
      if (!route) route = {name: 'Home'};
      return route
    }

    return true
  })

  return router;
}
