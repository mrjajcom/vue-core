import {Role} from "./Role.model";
import {Utils} from "@/core/tools/Utils";

/**
 * User model
 * @constructor
 */
export function User() {
  this.id = null
  this.first_name = null;
  this.last_name = null;
  this.email = null;
  this.password = null;
  this.location = null;
  this.title = null;
  this.description = null;
  this.tags = null;
  this.avatar = null;
  this.language = null;
  this.tfa_secret = null;
  this.status = null;
  this.last_access = null;
  this.last_page = null;
  this.provider = null;
  this.external_identifier = null;
  this.auth_data = null;
  this.email_notifications = null;
  this.appearance = null;
  this.theme_dark = null;
  this.theme_light = null;
  this.theme_light_overrides = null;
  this.theme_dark_overrides = null;
  this.role = Role.factory();
}

/**
 * Create object
 */
User.factory = function (data = null) {
  const object = new User();
  object.set(data)
  return object;
}

/**
 * Set data
 * @param data
 */
User.prototype.set = function (data) {
  try {
    if (!Utils.isObject(data)) return;
    if (Utils.isString(data)) data = {id: data}
    if (Utils.hasProperty(data, 'id')) this.id = data.id;
    if (Utils.hasProperty(data, 'first_name')) this.first_name = data.first_name;
    if (Utils.hasProperty(data, 'last_name')) this.last_name = data.last_name;
    if (Utils.hasProperty(data, 'email')) this.email = data.email;
    if (Utils.hasProperty(data, 'password')) this.password = data.password;
    if (Utils.hasProperty(data, 'location')) this.location = data.location;
    if (Utils.hasProperty(data, 'title')) this.title = data.title;
    if (Utils.hasProperty(data, 'description')) this.description = data.description;
    if (Utils.hasProperty(data, 'tags')) this.tags = data.tags;
    if (Utils.hasProperty(data, 'avatar')) this.avatar = data.avatar;
    if (Utils.hasProperty(data, 'language')) this.language = data.language;
    if (Utils.hasProperty(data, 'tfa_secret')) this.tfa_secret = data.tfa_secret;
    if (Utils.hasProperty(data, 'status')) this.status = data.status;
    if (Utils.hasProperty(data, 'last_access')) this.last_access = data.last_access;
    if (Utils.hasProperty(data, 'last_page')) this.last_page = data.last_page;
    if (Utils.hasProperty(data, 'provider')) this.provider = data.provider;
    if (Utils.hasProperty(data, 'external_identifier')) this.external_identifier = data.external_identifier;
    if (Utils.hasProperty(data, 'auth_data')) this.auth_data = data.auth_data;
    if (Utils.hasProperty(data, 'email_notifications')) this.email_notifications = data.email_notifications;
    if (Utils.hasProperty(data, 'appearance')) this.appearance = data.appearance;
    if (Utils.hasProperty(data, 'theme_dark')) this.theme_dark = data.theme_dark;
    if (Utils.hasProperty(data, 'theme_light')) this.theme_light = data.theme_light;
    if (Utils.hasProperty(data, 'theme_light_overrides')) this.theme_light_overrides = data.theme_light_overrides;
    if (Utils.hasProperty(data, 'theme_dark_overrides')) this.theme_dark_overrides = data.theme_dark_overrides;
    if (Utils.hasProperty(data, 'role')) this.role = Role.factory(data.role);
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Get full name
 * @return {string}
 */
User.prototype.getFullName = function () {
  try {
    return this.first_name + ' ' + this.last_name
  } catch (e) {
    Utils.devLog(e)
    return 'None'
  }
}

