import {Utils} from "@/core/tools/Utils";
import {reactive} from "vue";

/**
 * Data
 * handler array of a list
 * @constructor
 */
export function DataArray() {
  this._data = [];
}

/**
 * Create object
 * @return DataArray
 */
DataArray.reactive = function (...params) {
  return reactive(DataArray.factory(...params));
}

/**
 * Create object
 * @param data
 * @return {DataArray}
 */
DataArray.factory = function (data = null) {
  const object = new DataArray();
  if (data) object.set(data)
  return object;
}

/**
 * Set data
 * @return {*}
 */
DataArray.prototype.set = function (data) {
  this._data = data;
}

/**
 * Set item
 * @return {*}
 */
DataArray.prototype.setItem = function (index, value) {
  try {
    this._data[index] = value;
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Add item
 * @return {*}
 */
DataArray.prototype.add = function (item) {
  try {
    this._data.push(item)
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Set items
 * @param items {array}
 * @param map {function}
 */
DataArray.prototype.setItems = function (items, map = null) {
  try {
    this.reset()
    if (!Utils.isArray(items)) return;
    items?.forEach((item) => {
      if (Utils.isFunction(map)) item = map(item);
      this.add(item)
    })
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Get data
 * @return {*}
 */
DataArray.prototype.get = function (index = null) {
  try {
    if (!index) return this._data;
    return this._data[index];
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Reset
 * @return {*}
 */
DataArray.prototype.reset = function () {
  this._data = []
}


/**
 * Get first value
 * @return {*}
 */
DataArray.prototype.first = function () {
  try {
    return this._data[0];
  } catch (e) {
    return null;
  }
}


/**
 * Check has data
 * @return {*}
 */
DataArray.prototype.hasData = function () {
  try {
    return !!this._data?.length;
  } catch (e) {
    return false;
  }
}

/**
 * Count
 * @return {*}
 */
DataArray.prototype.count = function () {
  try {
    return this._data?.length;
  } catch (e) {
    return false;
  }
}

/**
 * Remove
 */
DataArray.prototype.remove = function (index) {
  try {
    delete this._data[index]
    this._data.splice(index, 1)
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Sort
 */
DataArray.prototype.sort = function (column = 'sort') {
  this._data.sort((a, b) => Utils.sortCompare(a, b, column))
}

/**
 * Loop for data
 * @param method
 */
DataArray.prototype.loop = function (method) {
  this._data.forEach(method)
}
