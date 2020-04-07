/**
 * Resource method factory.
 *
 * @param spec
 */
export function createZingleMethod (spec: ZingleMethodSpec): Function {
  return function (...args: any[]): Promise<any> {
    const callback = typeof args[args.length - 1] === 'function' && args.pop()

    // TODO: fix and actually return good stuff, for now just Promise
    return new Promise((resolve, reject) => {
      if (callback) {
        resolve(true)
      } else {
        reject(new Error())
      }
    })
  }
}

export interface ZingleMethodSpec {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  methodType?: 'list';
  path?: string;
  urlParams?: string[];
  encode?: Function;
  host?: string;
}
