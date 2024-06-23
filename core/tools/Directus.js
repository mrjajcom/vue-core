import {
  authentication,
  createDirectus,
  createItem,
  customEndpoint,
  deleteItem,
  logout,
  passwordRequest,
  readItem,
  readItems,
  readMe,
  refresh,
  rest,
  staticToken,
  updateItem,
  uploadFiles,
} from "@directus/sdk";
import {reactive} from "vue";
import {Auth} from "./Auth";
import {Urls} from "./Urls";
import {Utils} from "./Utils";
import {Handler} from "./Handler";
import {Messages} from "./Messages";
import {Configs} from "@/core/tools/Configs";


/**
 * Directus SDK usage
 * @constructor
 */
export function Directus() {
  this.type = null;
  this._success_message = null;
  this._then_handler = null
}


/**
 * Create object
 * @return Directus
 */
Directus.factory = function (collection = null) {
  const object = new Directus();
  object.setClient()
  object.setCollection(collection)
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
 * Keyword
 * @type {string|null|number}
 */
Directus.prototype.keyword = null;

/**
 * Set params
 * @type {null}
 */
Directus.prototype.params = null;

/**
 * Search filters handler
 * @type {function|null}
 */
Directus.prototype.search_filter = null;

/**
 * Collection name
 * @type {string|null}
 */
Directus.prototype.collection = null;

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
 * Set search filter
 * @param method
 */
Directus.prototype.setSearchFilter = function (method) {
  this.search_filter = method;
  return this;
}

/**
 * Set request params
 * @param params
 */
Directus.prototype.setParams = function (params) {
  this.params = {...this.params, ...params,};
  return this;
}

/**
 * Set request param
 * @param key
 * @param value
 * @param index
 */
Directus.prototype.setParam = function (key, value, index = null) {
  if (!this.params) this.params = {}
  if (!index) index = 'default'
  if (!this.params[key]) this.params[key] = {};
  this.params[key][index] = value;
  return this;
}

/**
 * Remove request param
 * @param key
 * @param index
 */
Directus.prototype.removeParam = function (key, index = null) {
  if (!this.params) this.params = {}
  if (!index) delete this.params[key];
  else delete this.params[key]?.[index];
  return this;
}

/**
 * Set then handler
 * @param method
 */
Directus.prototype.setThen = function (method) {
  this._then_handler = method;
  return this;
}

/**
 * Set request fields param
 * @param data
 */
Directus.prototype.setFields = function (data) {
  return this.setParam('fields', data)
}

/**
 * Set request filter param
 * @param data
 * @param index
 */
Directus.prototype.setFilter = function (data, index = null) {
  if (index && !data) return this.removeFilter(index);
  return this.setParam('filter', data, index)
}

/**
 * Set sort
 * @param data
 */
Directus.prototype.setSort = function (data) {
  return this.setParam('sort', data)
}

/**
 * Remove request filter param with index
 * @param index
 */
Directus.prototype.removeFilter = function (index) {
  return this.removeParam('filter', index)
}

/**
 * Set request limit param
 * @param data
 */
Directus.prototype.setLimit = function (data) {
  return this.setParam('limit', data)
}

/**
 * Get request params
 * @param params
 */
Directus.prototype.getParams = function (params) {
  try {
    if (!params) params = {}
    if (!Utils.isObject(this.params)) return params;

    const result = {}

    Object.keys(this.params)?.forEach(key => {
      let param = this.params[key]
      if (!Utils.isObject(param, false)) return result[key] = param;

      param = Object.values(param);
      if (!Utils.isArray(param)) return;

      if (param.length === 1) return result[key] = param[0];

      if (key === 'filter') return result[key] = {_and: param?.filter(i => !!i)};

      result[key] = param?.filter(i => !!i);
    })
    return {...result, ...params}
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Set collection name
 *
 * @param collection
 * @return {Directus}
 */
Directus.prototype.setCollection = function (collection) {
  this.collection = collection;
  return this;
}

/**
 * Send request
 * @param params
 */
Directus.prototype.request = async function (...params) {
  return await this._send(async () => {
      return await this.client
        .with(rest({
          onResponse: (data) => {
            return data
          }
        }))
        .request(...params)
    }
  )
}

/**
 * Send login request
 * @param params
 */
Directus.prototype.login = async function (...params) {
  const result = await this._send(async () => {
      const response = await this.client
        .with(authentication('json'))
        .with(rest())
        .login(...params)
      this._setAuth(response)
      return response;
    }
  )
  if (!result) return result;

  const user = await this.setFields('*, role.name, role.id').withAuth().getUser()
  if (!user) return user;
  return user;
}

/**
 * Register. !!! Need custom extension.
 * @param body
 */
Directus.prototype.register = async function (body, redirect) {
  return await this._send(async () => {
    return await this.request(
      customEndpoint({
        path: Urls.url('account_register' ?? '/account/register') + `?redirect=${redirect}`,
        method: 'POST',
        body: JSON.stringify(body)
      })
    );
  });
}

/**
 * Verify. !!! Need custom extension.
 * @param token
 */
Directus.prototype.verify = async function (token) {
  return await this._send(async () => {
    return await this.request(
      customEndpoint({
        path: (Urls.url('account_verify') ?? '/account/verify'),
        method: 'POST',
        body: JSON.stringify({token: token,})
      })
    );
  });
}

/**
 * Forgot password
 * @param email
 */
Directus.prototype.passwordRequest = async function (email) {
  return await this._send(async () => {
    return await this.request(
      passwordRequest(email)
    );
  });
}

/**
 * Refresh token
 */

Directus.prototype.refresh = async function () {
  const refresh_token = Auth.getRefreshToken();
  if (refresh_token)
    return await this._send(async () => {
        const response = await this.request(refresh('json', Auth.getRefreshToken()))
        this._setAuth(response)
        return response;
      }
    )

  // with session or cookie
  const type = this._getAuthType()
  return await this._send(async () => {
      const client = this.client.with(authentication(type, {credentials: 'include'}));
      const response = await client.refresh();
      this._setAuth(response)
      return response;
    }
  )

}


/**
 * Logout token
 */
Directus.prototype.logout = async function () {
  const refresh_token = Auth.getRefreshToken();
  if (refresh_token){
    return await this._send(async () => {
        const response = await this.request(logout(refresh_token, 'json'))
        Auth.logout()
        return response;
      }
    )
  }

  // with cookie or session
  const type = this._getAuthType()
  return await this._send(async () => {
      const client = this.client.with(authentication(type, {credentials: 'include'}));
      const response = await client.logout();
      Auth.logout()
      return response;
    }
  )
}

/**
 * Add with account to client
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
 * With total count
 */
Directus.prototype.withTotal = function () {
  this.setParam('meta', 'filter_count')
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
 * Get items request
 * @param params
 */
Directus.prototype.getItems = async function (params = {}) {
  return await this.request(readItems(this.collection, this.getParams(params)))
}

/**
 * Fetch current user data
 * @return {*}
 */
Directus.prototype.getUser = async function (params = {}) {
  let result = await this.request(readMe(this.getParams(params)))
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
  this.response = null;
  this.keyword = null;
  this.type = null;
}

/**
 * Check has data length
 */
Directus.prototype.hasData = function () {
  return !!this.count()
}

/**
 * Check has client
 * @return {boolean}
 */
Directus.prototype.hasClient = function () {
  return !!this.client
}

/**
 * Check has data in response
 */
Directus.prototype.hasResponse = function () {
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
  return Urls.api() + '/assets/' + data + '?access_token=' + Auth.getToken()
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
 * Create item
 * @param body
 * @param params
 */
Directus.prototype.createItem = async function (body = {}, params = {}) {
  return await this.request(createItem(this.collection, body, this.getParams(params)))
}

/**
 * Get item request
 * @param id
 * @param params
 */
Directus.prototype.getItem = async function (id, params = {}) {
  return await this.request(readItem(this.collection, id, this.getParams(params)))
}

/**
 * Get filters
 */
Directus.prototype.getFilters = function () {
  try {
    return this.params?.filter;
  } catch (e) {
    Utils.devLog(e)
    return null;
  }
}

/**
 * Update item
 * @param id
 * @param body
 * @param params
 */
Directus.prototype.updateItem = async function (id, body, params = {}) {
  return await this.request(updateItem(this.collection, id, body, this.getParams(params)))
}

/**
 * Delete item
 * @param id
 */
Directus.prototype.deleteItem = async function (id) {
  return await this.request(deleteItem(this.collection, id))
}

/**
 * Archive item
 * @param id
 * @return {Promise<*>}
 */
Directus.prototype.archiveItem = async function (id) {
  return await this.updateItem(id, {status: 'archived'})
}

/**
 * Un Archive item
 * @param id
 * @return {Promise<*>}
 */
Directus.prototype.unArchiveItem = async function (id, status = 'active') {
  return await this.updateItem(id, {status: status})
}

/**
 * Search
 * @return {Promise<*>}
 */
Directus.prototype.search = async function (params = {}) {
  this._onSearchHandler()
  return await this.getItems(params)
}

/**
 * Get response items count
 */
Directus.prototype.count = function () {
  try {
    return this.response?.length
  } catch (e) {
    return 0;
  }
}

/**
 * Set type
 * this option is helper method
 */
Directus.prototype.setType = function (value) {
  this.type = value;
}

/**
 * Check request type
 * @param type
 */
Directus.prototype.is = function (type) {
  return this.type === type;
}


// Privates ****************************************

/**
 * Get auth type
 * @return {*}
 * @private
 */
Directus.prototype._getAuthType = function () {
  return Configs.get('users.refresh_with') ?? 'cookie';
}

/**
 * On search
 * @return {{}|*}
 * @private
 */
Directus.prototype._onSearchHandler = function () {
  try {
    if (!Utils.isFunction(this.search_filter)) return;
    const filter_index_key = 'filter-search'
    if (!this.keyword) return this.removeFilter(filter_index_key)

    const filter = this.search_filter(this);
    if (!filter) return;

    this.setFilter(filter, filter_index_key);
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Send request and set loading
 * @private
 */
Directus.prototype._send = async function (method) {
  try {
    this.loading = true;
    this.response = await method();
    this.loading = false;
    this._doThen();
    this._showMessage();
    return this.getResponse();
  } catch (e) {
    this._doThen();
    Handler.error(e)
    this.reset()
    Utils.devLog(e)
  }
}

/**
 * Set account data
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

/**
 * Run then method handler
 * @private
 */
Directus.prototype._doThen = function () {
  try {
    if (!this._then_handler) return;
    this._then_handler(this.response)
  } catch (e) {
    console.log(e);
  }
}
