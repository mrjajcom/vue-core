import moment from "moment";

/**
 * Create moment plugin
 * @return {{install(): void}}
 */
export function createMoment() {
  return {
    install(app) {
      app.config.globalProperties.date = convertDate;
    }
  }
}


/**
 * Convert date
 * @param string
 * @param format
 * @return {null|string}
 */
export function convertDate(string, format = 'YYYY-MM-DD HH:mm') {
  try {
    return moment(string).format(format);
  } catch (e) {
    this.devLog(e)
    return null;
  }
}
