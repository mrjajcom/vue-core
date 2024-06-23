import {Utils} from "../../../../tools/Utils";

export function Role() {
  this.id = null;
  this.name = null;
  this.icon = null;
}

/**
 * Create object
 * @param data
 * @return {Role}
 */
Role.factory = function (data = null) {
  const object = new Role();
  if (data) object.set(data);
  return object;
}

/**
 * Set data
 */
Role.prototype.set = function (data) {
  try {
    if (!data) return;
    if (Utils.isString(data)) data = {id: data}
    if (Utils.hasProperty(data, 'id')) this.id = data.id;
    if (Utils.hasProperty(data, 'name')) this.name = data.name;
    if (Utils.hasProperty(data, 'icon')) this.icon = data.icon;
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Check user has a special roles
 */
Role.prototype.is = function (roles) {
  try {
    if (!roles) return false;
    if (Utils.isString(roles)) roles = [roles]
    return roles.includes(this.id);
  } catch (e) { 
    Utils.devLog(e)
    return false;
  }
}
