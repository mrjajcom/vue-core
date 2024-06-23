import Trans from "../../../../tools/Trans";
import {Utils} from "@/core/tools/Utils";
import {Directus} from "@/core/tools/Directus";

export class CollectionItem {
  /**
   * Item id
   */
  id = null;

  /**
   * Item status
   */
  status = null;

  /**
   * Item visibility
   */
  visible = true;

  /**
   * Request
   */
  request: any = null;

  /**
   * Collection name
   */
  collection = null;

  /**
   * Body
   * @type {Function|{}}
   */
  body = null;

  /**
   * Constructor
   * @param collection
   */
  constructor(collection) {
    this.collection = collection;
  }

  /**
   * Set request
   */
  setRequest() {
    this.request = Directus.reactive(this.collection);
    this.request.setClient()
    this.request.setCollection(this.collection)
  }

  /**
   * Set unArchive
   * @param active_status
   */
  async unArchive(active_status = 'active') {
    if (!this.request) this.setRequest();

    if (!this.id) return false;
    if (this.request?.loading) return;

    this.request.reset()
    this.request.withAuth()
    this.status = active_status;
    return await this.request.withMessage(Trans.t('UnArchived')).unArchiveItem(this.id, active_status)
  }

  /**
   * Archive item
   * @return {Promise<*|boolean>}
   */
  async archive() {
    if (!this.request) this.setRequest();

    if (!this.id) return false;
    if (this.request?.loading) return;

    this.request.reset()
    this.request.withAuth()
    this.status = 'archived';
    return await this.request.withMessage(Trans.t('Archived')).archiveItem(this.id)
  }

  /**
   * Fetch item
   * @param params
   * @return {Promise<*|boolean>}
   */
  async fetch(params = {}) {
    if (!this.request) this.setRequest();

    if (!this.id) return false;
    if (this.request?.loading) return;

    this.request.reset()
    this.request.withAuth()

    const result = await this.request.getItem(this.id, params);
    if (!result) return null;

    this.setData(result)
    return result;
  }

  /**
   * Set data
   * @param result
   */
  setData(result) {
    //
  }

  /**
   * Create or update
   * @return {Promise<*|boolean>}
   */
  async createOrUpdate(body = null, params = {}, set = false) {
    if (!this.request) this.setRequest();

    if (this.request?.loading) return;
    this.request.reset()
    this.request.withAuth()

    if (!Utils.isObject(body)) body = this.getBody();
    if (!Utils.isObject(body)) return Utils.devLog('Not found body!');

    if (this.id) {
      const result = await this.request.withMessage().updateItem(this.id, body, params)
      if (set) this.setData(result)
      return result;
    }

    const result = await this.request.withMessage().createItem(body, params);
    if (set) this.setData(result)
    return result;
  }


  /**
   * Get body handler result
   */
  getBody() {
    if (!this.body) return;
    if (!Utils.isFunction(this.body)) return this.body;
    this.body()
  }


  /**
   * Update
   * @return {Promise<*|boolean>}
   */
  async update(body = null, params = {}) {
    if (!this.request) this.setRequest();

    if (this.request?.loading) return;
    this.request.reset()
    this.request.withAuth()

    if (!Utils.isObject(body)) return Utils.devLog('Not found body!');
    if (!this.id) return Utils.devLog('Not found id!');
    return await this.request.withMessage().updateItem(this.id, body, params)
  }

  /**
   * Delete
   * @return {Promise<*|boolean>}
   */
  async remove() {
    if (!this.request) this.setRequest();
    if (this.request?.loading) return;
    if (!this.id) return null;

    this.request.reset()
    this.request.withAuth()

    return await this.request.withMessage().deleteItem(this.id)
  }

  /**
   * Set id
   */
  setId(id) {
    this.id = id;
  }

  /**
   * Set item with key
   */
  set(key, value) {
    try {
      this[key] = value;
    } catch (e) {
      Utils.devLog(e)
    }
  }

  /**
   * Get item with key
   */
  get(key = null) {
    try {
      if (!key) return this;
      return this?.[key];
    } catch (e) {
      Utils.devLog(e)
      return null;
    }
  }


  /**
   * To Json
   */
  toJson() {
    return {...this}
  }

  /**
   * is Archived
   */
  isArchived() {
    return this.status === 'archived'
  }

  /**
   * is active
   */
  isActive() {
    return this.status === 'active'
  }

  /**
   * Set visibility value
   */
  setVisibility(value) {
    this.visible = value
  }

  /**
   * Check is visible
   */
  isVisible() {
    return this.visible
  }

}
