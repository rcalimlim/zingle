import { Utils, Hash } from './utils'

/**
 * Resource method factory.
 *
 * @param spec
 */
const ZingleMethod: Hash = {
  generate: (spec: ZingleMethodSpec): Function => {
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
}

/**
 * All Zingle common methods
 */
ZingleMethod.common = {
  create: ZingleMethod.generate({
    method: 'POST'
  }),

  list: ZingleMethod.generate({
    method: 'GET',
    methodType: 'list'
  }),

  retrieve: ZingleMethod.generate({
    method: 'GET',
    path: '/{id}'
  }),

  update: ZingleMethod.generate({
    method: 'POST',
    path: '{id}'
  }),

  // 'delete' is a reserved word in JavaScript
  del: ZingleMethod.generate({
    method: 'DELETE',
    path: '{id}'
  })
}

export const CommonMethodSpecs: Record<string, ZingleMethodSpec> = {
  create: { method: 'POST' },

  list: {
    method: 'GET',
    methodType: 'list'
  },

  retrieve: {
    method: 'GET',
    path: '/{id}'
  },

  update: {
    method: 'POST',
    path: '{id}'
  },

  del: {
    method: 'DELETE',
    path: '{id}'
  }

}

export { ZingleMethod }

export interface ZingleMethodSpec {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  methodType?: 'list';
  path?: string;
  urlParams?: string[];
  encode?: Function;
  host?: string;
}

export type ZingleCommonMethodsEnum = 'create' | 'list' | 'retrieve' | 'update' | 'del'
