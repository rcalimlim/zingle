/* eslint-disable @typescript-eslint/no-explicit-any */
export type Hash = {
  [k: string]: any;
}

export const Utils = {
  /**
   * Extract url params from a path string with param symbols.
   */
  extractUrlParams: (path: string): string[] => {
    const params = path.match(/\{\w+\}/g)
    if (!params) {
      return []
    }

    return params.map((param) => param.replace(/[{}]/g, ''))
  },

  /**
   * Outputs a new function with interpolated object property values.
   * Use like so:
   *   var fn = makeURLInterpolator('some/url/{param1}/{param2}');
   *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
   */
  makeUrlInterpolator: ((): Function => {
    const rc: Hash = {
      '\n': '\\n',
      '"': '\\"',
      '\u2028': '\\u2028',
      '\u2029': '\\u2029'
    }
    return (str: string): Function => {
      const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0: string) => rc[$0])
      return (outputs: Hash): string => {
        return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) =>
          encodeURIComponent(outputs[$1] || '')
        )
      }
    }
  })()
}
