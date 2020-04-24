/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPTIONS_KEYS } from './Zingle'

/**
 * Utility functions, interfaces, and types
 */
const Utils = {
  /**
   * Checks if passed object has passed property on it.
   *
   * @param {object} obj - object on which to check for property
   * @param {string} prop - name of property
   * @returns {boolean}
   */
  hasOwn: (obj: Record<string, any>, prop: string): boolean => {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  },

  /**
   * Extracts symbolic URL parameters from symbolic URL string.
   *
   * @param {string} path - symbolic url string
   * @returns {array}
   */
  extractUrlParams: (path: string): string[] => {
    const params = path.match(/\{\w+\}/g)

    // if no path params, return empty array
    if (!params) {
      return []
    }

    return params.map((param) => param.replace(/[{}]/g, ''))
  },

  isOptionsHash (obj: Record<string, any>): boolean {
    return (
      obj &&
      typeof obj === 'object' && OPTIONS_KEYS.some((prop) => Utils.hasOwn(obj, prop))
    )
  },

  /**
   * Outputs a new function with interpolated object property values.
   * Use like so:
   *   var fn = makeURLInterpolator('some/url/{param1}/{param2}');
   *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
   *
   * Lifted from stripe's Node.js wrapper (https://github.com/stripe/stripe-node/blob/master/lib/utils.js)
   */
  makeUrlInterpolator: ((): Function => {
    const rc: Record<string, string> = {
      '\n': '\\n',
      '"': '\\"',
      '\u2028': '\\u2028',
      '\u2029': '\\u2029'
    }
    return (str: string): Function => {
      const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0])
      return (outputs: Record<string, string|number>): string => {
        return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) =>
          encodeURIComponent(outputs[$1] || '')
        )
      }
    }
  })()
}

export default Utils
