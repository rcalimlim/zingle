/* eslint-disable @typescript-eslint/no-explicit-any */
const OPTIONS_KEYS = [
  'maxNetworkRetries',
  'timeout'
]

const hasOwn = (obj: Record<string, any>, prop: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

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
   * Return data argument from arg array
   */
  getDataFromArgs: (args: object[]): object => {
    if (!Array.isArray(args) || !args[0] || typeof args[0] !== 'object') {
      return {}
    }

    if (!Utils.isOptionsHash(args[0])) {
      const data = args.shift()
      return data || {}
    }

    return {}
  },

  /**
   * Return the options hash from a list of arguments
   */
  getOptionsFromArgs: (args: any[]): RequestOptions => {
    const opts: RequestOptions = {
      auth: null,
      headers: {},
      settings: {}
    }
    if (args.length > 0) {
      const arg = args[args.length - 1]
      if (typeof arg === 'string') {
        opts.auth = args.pop() || null
      } else if (Utils.isOptionsHash(arg)) {
        const params = args.pop()

        if (params.apiKey) {
          opts.auth = params.apiKey
        }
        if (Number.isInteger(params.maxNetworkRetries)) {
          opts.settings.maxNetworkRetries = params.maxNetworkRetries
        }
        if (Number.isInteger(params.timeout)) {
          opts.settings.timeout = params.timeout
        }
      }
    }
    return opts
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
  })(),

  /**
   * Determine if object has option settings
   */
  isOptionsHash (o: object): boolean {
    return (
      o &&
      typeof o === 'object' &&
      OPTIONS_KEYS.some((prop) => hasOwn(o, prop))
    )
  },

  /**
   * Converts a string in Pascal case into a string in camelCase.
   */
  pascalToCamelCase: (name: string): string => {
    return name[0].toLowerCase() + name.substring(1)
  }
}

interface RequestOptions {
  auth: string|null;
  headers: Hash;
  settings: Hash;
}
