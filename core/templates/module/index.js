import {initHooks} from "./hooks";
import {initRoutes} from "./routes";
import {initMessages} from "./lang";

export default {
  init() {
    initHooks();
    initRoutes()
    initMessages()
  },
}
