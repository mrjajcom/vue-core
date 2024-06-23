import {Utils} from "@/core/tools/Utils";
import {File} from "@/core/models/files/File.model";
import {DataObject} from "@/core/models/data/DataObject";
import {ProductAttributes} from "@/modules/products/models/products-attributes/ProductAttributes.model";

/**
 * Files model
 * @constructor
 */
export function Files() {
  this.data = DataObject.reactive()
}

/**
 * Create object
 * @param data
 * @return {Files}
 */
Files.factory = function (data = null) {
  const object = new Files();
  object.set(data)
  return object;
}

/**
 * Set list
 * @param data
 */
Files.prototype.set = function (data) {
  if (data instanceof Files) data = [...(data?.data?.getValues() ?? [])]
  this.data.setItems(data, (i) => File.factory(i))
}

/**
 * Count
 * @return {number | undefined}
 */
Files.prototype.add = function (data) {
  if (!(data instanceof File)) data = File.factory(data)
  this.data.add(data)
}

/**
 * To directus files array
 * @return {unknown[]}
 */
Files.prototype.toManyToMany = function () {
  try {
    return this.data.toArray()?.map(file => file?.toManyToMany())
  } catch (e) {
    return null;
  }
}
