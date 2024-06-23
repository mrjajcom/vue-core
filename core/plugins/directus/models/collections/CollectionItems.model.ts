import {Directus} from "@/core/tools/Directus";
import {Utils} from "@/core/tools/Utils";
import {DataArray} from "@/core/models/data/DataArray";

export class CollectionItems {

  /**
   * Fetch params
   */
  fetch_params: null | any = null

  /**
   * Search filter
   */
  search_filter: Function | null = null

  /**
   * Data
   */
  data = DataArray.reactive()

  /**
   * Request
   */
  request: any = null;

  /**
   * Collection name
   */
  collection: string | null = null;

  /**
   * Map function
   * @type Function
   */
  _map: Function | null = null;

  /**
   * Constructor
   * @param collection
   */
  constructor(collection) {
    this.collection = collection;
  }

  /**
   * Set data
   * @param items
   */
  setData(items) {
    if (!Utils.isFunction(this._map)) return this.data.setItems(items);
    this.data.setItems(items, i => this._map(i))
  }

  /**
   * Set data
   * @param method
   */
  setMap(method) {
    this._map = method;
  }

  /**
   * Set request configs and data
   */
  setRequest() {
    this.request = Directus.reactive(this.collection);
    this.request.withAuth()
    this.request.setThen((items) => this.setData(items))
    if (this.fetch_params) this.request.setParams(this.fetch_params)
    if (Utils.isFunction(this.search_filter)) this.request.setSearchFilter(this.search_filter)
  }

  /**
   * Fetch
   * @param params
   * @return {Promise<{}>}
   */
  async fetch(params = null) {
    if (!this.request) this.setRequest()
    return await this.request.getItems(params)
  }
}
