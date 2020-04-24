/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility functions, interfaces, and types
 */
const Utils = {

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
