/**
 * Nested
 * Get/Set/Remove nested object path
 */
export function Nested() {

}


/**
 * Set nested in object
 * @param object {object}
 * @param path_array {array, string, number}
 * @param value
 */
Nested.set = function (object, path_array, value) {
  try {
    if (typeof path_array == "number") path_array = [path_array];
    if (typeof path_array == "string") path_array = path_array.split('.');

    const prop = path_array.shift()
    if (!object[prop]) {
      object[prop] = {}
    }

    if (!path_array.length) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        object[prop] = {...object[prop], ...value}
      } else {
        object[prop] = value
      }
      return
    }
    this.set(object[prop], path_array, value)
  } catch (e) {
    console.log(e);
  }
}

/**
 * Get nested value from object
 * @param object {object}
 * @param path_array {array, string}
 * @returns {*}
 */

Nested.get = function (object, path_array) {
  if (typeof path_array == "number") path_array = [path_array];
  if (typeof path_array == "string") path_array = path_array.split('.');
  const prop = path_array.shift()
  if (!object[prop] || !path_array.length) {
    return object[prop]
  }
  return this.get(object[prop], path_array)
}

/**
 * Delete nested value from object
 * @param object {object}
 * @param path_array {array, string}
 * @returns {*}
 */

Nested.delete = function (object, path_array) {
  if (typeof path_array == "number") path_array = [path_array];
  if (typeof path_array == "string") path_array = path_array.split('.');
  const prop = path_array.shift()
  if (!object[prop]) {
    return
  }
  if (!path_array.length) {
    delete object[prop]
    return
  }
  this.delete(object[prop], path_array)
}
