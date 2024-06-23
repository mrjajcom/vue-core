import {Utils} from "@/core/tools/Utils";

/**
 * File model
 * @constructor
 */
export function File() {
  this.m2m = {}
  this.id = null
  this.filename_disk = null
  this.filename_download = null
  this.filesize = null
  this.folder = null
  this.height = null
  this.storage = null
  this.title = null
  this.type = null
}

/**
 * Create object
 * @param data
 * @return {File}
 */
File.factory = function (data = null) {
  const object = new File();
  object.set(data)
  return object;
}

/**
 * Set list
 * @param data
 */
File.prototype.set = function (data) {
  try {

    if (!data) return;

    if (Utils.hasProperty(data, 'directus_files_id')) {
      this.m2m = {...data};
      data = data?.directus_files_id
    }

    if (Utils.isString(data)) data = {id: data}
    if (Utils.hasProperty(data, 'id')) this.id = data.id;
    if (Utils.hasProperty(data, 'filename_disk')) this.filename_disk = data.filename_disk;
    if (Utils.hasProperty(data, 'filename_download')) this.filename_download = data.filename_download;
    if (Utils.hasProperty(data, 'filesize')) this.filesize = data.filesize;
    if (Utils.hasProperty(data, 'folder')) this.folder = data.folder;
    if (Utils.hasProperty(data, 'height')) this.height = data.height;
    if (Utils.hasProperty(data, 'storage')) this.storage = data.storage;
    if (Utils.hasProperty(data, 'title')) this.title = data.title;
    if (Utils.hasProperty(data, 'type')) this.type = data.type;

  } catch (e) {
    Utils.devLog(e)
  }
}


/**
 * To directus files array
 * @return {unknown[]}
 */
File.prototype.toManyToMany = function () {
  try {
    const item = {}
    if (this.m2m?.id) item.id = this.m2m?.id;
    item.directus_files_id = Utils.isObject(this.m2m)
      ? this.m2m?.directus_files_id
      : this.id;
    return item;
  } catch (e) {
    Utils.devLog(e)
    return null;
  }
}
