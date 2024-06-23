import {Utils} from "@/core/tools/Utils";
import {reactive} from "vue";

/**
 * Data
 * handler object of a list
 * @constructor
 */
export function DataObject() {
}

/**
 * Create object
 * @return DataObject
 */
DataObject.reactive = function (...params) {
  return reactive(DataObject.factory(...params));
}

/**
 * Create object
 * @param data
 * @return {DataObject}
 */
DataObject.factory = function (data = null) {
  const object = new DataObject();
  if (data) object.set(data)
  return object;
}

/**
 * Data
 */
DataObject.prototype._data = {}

/**
 * User id
 */
DataObject.prototype._user_id = false


/**
 * Create id for add object
 */
DataObject.prototype.indexById = function () {
  this._use_id = true
}

/**
 * Set data
 * @return {*}
 */
DataObject.prototype.set = function (data) {
  this._data = data;
}

/**
 * Set item
 * @return {*}
 */
DataObject.prototype.setItem = function (key, value) {
  try {
    this._data[key] = value;
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Add item
 * @return {*}
 */
DataObject.prototype.add = function (item, index = null) {
  try {

    if (this._use_id || index === null) {
      index = item?.id
      if (!index) index = Utils.uniqueId()
    }

    this.setItem(index, item)
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Set items
 * @param items {array}
 * @param map {function}
 */
DataObject.prototype.setItems = function (items, map = null) {
  try {
    this.reset()
    if (!Utils.isArray(items)) return;

    items?.forEach((item, index) => {
      if (Utils.isFunction(map)) item = map(item);
      this.add(item, index)
    })

  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Get data
 * @return {*}
 */
DataObject.prototype.get = function (key = null) {
  try {
    if (!key) return this._data;
    return this._data[key];
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Reset
 * @return {*}
 */
DataObject.prototype.reset = function () {
  this._data = {}
}

/**
 * Get values to array
 * @return {*}
 */
DataObject.prototype.toArray = function () {
  try {
    return this.getValues();
  } catch (e) {
    return null;
  }
}

/**
 * Get values to array
 * @return {*}
 */
DataObject.prototype.getValues = function () {
  try {
    return Object.values(this._data);
  } catch (e) {
    return null;
  }
}

/**
 * Get first value
 * @return {*}
 */
DataObject.prototype.first = function () {
  try {
    return this.getValues()?.[0];
  } catch (e) {
    return null;
  }
}

/**
 * Get keys to array
 * @return {*}
 */
DataObject.prototype.getKeys = function () {
  try {
    return Object.keys(this._data);
  } catch (e) {
    return null;
  }
}

/**
 * Check has data
 * @return {*}
 */
DataObject.prototype.hasData = function () {
  try {
    return !!this.getKeys()?.length;
  } catch (e) {
    return false;
  }
}

/**
 * Count
 * @return {*}
 */
DataObject.prototype.count = function () {
  try {
    return this.getKeys()?.length;
  } catch (e) {
    return false;
  }
}

/**
 * Remove
 */
DataObject.prototype.remove = function (index) {
  try {
    delete this._data[index]
  } catch (e) {
    Utils.devLog(e)
  }
}
