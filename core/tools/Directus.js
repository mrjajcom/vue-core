import {
  authentication,
  createDirectus,
  createItem,
  logout,
  readItems,
  readMe,
  refresh,
  rest,
  staticToken,
  updateItem,
  uploadFiles
} from "@request/sdk";
import {reactive} from "vue";
import {Auth} from "./Auth";
import {Urls} from "./Urls";
import {Utils} from "@/tools/Utils";
import {Handler} from "@/tools/Handler";
import {Messages} from "@/tools/Messages";


/**
 * Directus SDK usage
 * @constructor
 */
export function Directus() {
  this._success_message = null;
}

/**
 * Create object
 * @return Directus
 */
Directus.factory = function () {
  const object = new Directus();
  object.setClient()
  return object;
}

/**
 * Create object
 * @return Directus
 */
Directus.reactive = function (...params) {
  return reactive(Directus.factory(...params));
}

/**
 * Loading
 * @type {boolean}
 */
Directus.prototype.loading = false;

/**
 * Response result
 * @type {*}
 */
Directus.prototype.response = null;

/**
 * Client
 * @type {DirectusClient<any> & RestClient<Schema>}
 */
Directus.prototype.client = null;

/**
 * Set client with rest
 * @returns {DirectusClient<any> & RestClient<Schema>}
 */
Directus.prototype.setClient = function () {
  this.client = createDirectus(Urls.api(''));
  return this.client;
}

/**
 * Send request
 * @param params
 */
Directus.prototype.request = async function (...params) {
  return await this._send(async () => {
      return await this.client
        .with(rest())
        .request(...params)
    }
  )
}

/**
 * Send login request
 * @param params
 */
Directus.prototype.login = async function (...params) {
  return await this._send(async () => {
      const response = await this.client
        .with(authentication('json'))
        .with(rest())
        .login(...params)
      this._setAuth(response)
      return response;
    }
  )
}

/**
 * Refresh token
 */
Directus.prototype.refresh = async function () {
  return await this._send(async () => {
      const response = await this.request(refresh('json', Auth.getRefreshToken()))
      this._setAuth(response)
      return response;
    }
  )
}

/**
 * Logout token
 */
Directus.prototype.logout = async function () {
  return await this._send(async () => {
      const response = await this.request(logout(Auth.getRefreshToken()))
      Auth.logout()
      return response;
    }
  )
}

/**
 * Add with auth to client
 */
Directus.prototype.withAuth = function () {
  this.client = this.client.with(staticToken(Auth.getToken()))
  return this;
}

/**
 * Map response
 */
Directus.prototype.withMap = function (method) {
  this._map = method
  return this;
}

/**
 * Set successfully message
 * @param message
 * @return {*}
 */
Directus.prototype.withMessage = function (message = null) {
  try {
    if (message) this._success_message = message;
    else this._success_message = 'Done';
    return this;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Create items
 * @param collection*
 * @param params
 */
Directus.prototype.createItem = async function (collection, params = {}) {
  return await this.request(createItem(collection, params))
}

/**
 * Get items request
 * @param collection*
 * @param params
 */
Directus.prototype.getItems = async function (collection, params = {}) {
  return await this.request(readItems(collection, params))
}

/**
 * Fetch current user data
 * @return {*}
 */
Directus.prototype.getUser = async function (params = {}) {
  const result = await this.request(readMe(params))
  Auth.setUser(result);
  return result;
}

/**
 * Upload files
 * @param files*
 * @param options
 * @return {Promise<*|null>}
 */
Directus.prototype.upload = async function (files, options = {}) {
  try {
    if (!files) return null;

    const formData = new FormData();
    files?.forEach(file => {
      formData.append('filename_disk', file?.name);
      formData.append('filename_download', file?.name);
      Object.keys(options)?.forEach(key => formData.append(key, options?.[key]))
      formData.append('file', file);
    })

    return await this.request(uploadFiles(formData));
  } catch (e) {
    Utils.devLog(e)
    return this.response
  }
}

/**
 * Reset request data
 */
Directus.prototype.reset = function () {
  this.loading = false;
  this.response = null;
}

/**
 * Check has data in response
 */
Directus.prototype.hasData = function () {
  return !!this.response
}

/**
 * Asset url
 * @return {*}
 */
Directus.prototype.asset = function (data) {
  if (Utils.isObject(data)) {
    if (Utils.hasProperty(data, 'directus_files_id')) data = data?.directus_files_id;
    else data = data?.id
  }

  return Urls.api('assets', [data]) + '?access_token=' + Auth.getToken()
}


/**
 * Get response
 */
Directus.prototype.getResponse = function () {
  try {
    if (!Utils.isArray(this.response) || !Utils.isFunction(this._map)) return this.response
    return this.response?.map(i => this._map(i))
  } catch (e) {
    console.log(e);
    return this.response
  }
}


/**
 * Update item
 * @param collection
 * @param id
 * @param params
 * @return {Promise<*>}
 */
Directus.prototype.updateItem = async function (collection, id, params) {
  return await this.request(updateItem(collection, id, params))
}

/**
 * Archive item
 * @param collection
 * @param id
 * @return {Promise<*>}
 */
Directus.prototype.archiveItem = async function (collection, id) {
  return await this.updateItem(collection, id, {status: 'archived'})
}

// Privates ****************************************

/**
 * Send request and set loading
 * @private
 */
Directus.prototype._send = async function (method) {
  try {
    this.loading = true;
    this.response = await method();
    this.loading = false;
    this._showMessage();
    return this.getResponse();
  } catch (e) {
    Handler.error(e)
    this.reset()
    Utils.devLog(e)
  }
}

/**
 * Set auth data
 * @private
 */
Directus.prototype._setAuth = function (response = null) {
  if (!response) response = this.response
  if (!Utils.isObject(response) || !response?.access_token) return;
  Auth.setToken(response?.access_token)
  Auth.setExpiration(response?.expires)
  Auth.setRefreshToken(response?.refresh_token)
};

/**
 * Show success message
 * @private
 */
Directus.prototype._showMessage = function () {
  if (!this._success_message) return;
  Messages.show(this._success_message)
};
