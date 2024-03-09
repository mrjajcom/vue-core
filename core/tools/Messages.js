import {Utils} from "@/tools/Utils";

const messages = {}

/**
 * Messages
 * Display a quick messages to user.
 */
export function Messages() {

}

/**
 * Add message
 * @param text
 * @param options {{color, btnColor,}}
 */
Messages.show = function (text, options = {}) {
  try {
    let timeout = 2000;
    if (options?.time) timeout = options?.time;
    if (options?.timeout) timeout = options?.timeout;

    const key = Utils.uniqueId();
    setTimeout(() => Messages.remove(key), timeout)
    messages[key] = {text: text, timeout: timeout, options: options}

    Messages.updated(messages)
  } catch (e) {
    Utils.devLog(e)
  }
}

/**
 * Add error message
 * @param error
 * @param options
 */
Messages.error = function (error, options = {}) {
  this.show(error, {type: 'error', ...options})
}

/**
 * Remove error message
 * @param key
 */
Messages.remove = function (key) {
  try {
    delete messages[key];
    Messages.updated(messages)
  } catch (e) {
    Utils.devLog(e)
  }
}


/**
 * Run updated method error message
 */
Messages.updated = function () {
}

