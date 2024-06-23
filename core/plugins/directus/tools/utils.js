import {Auth} from "../../../tools/Auth";
import {User} from "../models/account/User.model";
import {Utils} from "../../../tools/Utils";

/**
 * Check has roles
 * @return {boolean}
 */
export function hasRole(roles) {
  try {
    if (!roles || (Utils.isArray(roles) && !roles.length)) return true;
    const user = User.factory(Auth.getUser())
    if (Utils.isFunction(roles)) return roles(user?.role?.id)
    return user?.role?.is(roles);
  } catch (e) {
    Utils.devLog(e);
    return false;
  }
}
