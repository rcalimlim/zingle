/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import ZingleResource from './ZingleResource'
import { OPTIONS_KEYS } from './Zingle'
import Utils from './Utils'
import { ZingleMethodSpec } from './ZingleMethod'

// Request namespace
const ZingleRequest = {
  /**
   * Returns a hash object of urlParam keys with matching urlData values to be passed to an
   * interpolator function for URL path creation.
   *
   * @param {string[]} urlParams - list of placeholders to be replaced with url data
   * @param {string[]} requestArgs - array of data ordered by matching urlParam
   * @returns {object}
   */
  buildUrlData: (urlParams: string[], requestArgs: any[]): Record<string, string> => {
    return urlParams.reduce((
      data: Record<string, string>,
      param: string
    ): Record<string, string> => {
      const arg = requestArgs.shift()
      if (typeof arg !== 'string') {
        throw new Error(`Zingle: Argument "${param}" must be a string, but got: ${arg}`)
      }
      data[param] = arg
      return data
    }, {})
  },

  /**
   * Pulls out the data object from the request args if there is one and returns it.
   * Otherwise just returns an empty object.
   *
   * @param {object[]} requestArgs - array of method request args
   * @returns {object}
   */
  extractArgData: (requestArgs: any[]): Record<string, any> => {
    if (!Array.isArray(requestArgs) || !requestArgs[0] || typeof requestArgs[0] !== 'object') {
      return {}
    }

    if (!Utils.isOptionsHash(requestArgs[0])) {
      return requestArgs.shift()
    }

    const argKeys = Object.keys(requestArgs[0])
    const optionKeysInArgs = argKeys.filter((key) =>
      OPTIONS_KEYS.includes(key)
    )
    // error if the user put options in the damn data object
    if (optionKeysInArgs.length > 0 && optionKeysInArgs.length !== argKeys.length) {
      throw new Error(
        `Zingle: Data object should not contain options arguments: ${optionKeysInArgs.join(',')}`
      )
    }
    return {}
  },

  /**
   * Return the options hash from a list of arguments
   *
   * @param {object[]} requestArgs - array of method request args
   * @returns {object}
   */
  extractOptionsData: (requestArgs: any[]): Record<string, any> => {
    const opts = {
      auth: null,
      headers: {},
      settings: {
        maxNetworkRetries: undefined,
        timeout: undefined
      }
    }

    if (requestArgs.length > 0) {
      const arg = requestArgs[requestArgs.length - 1]
      if (typeof arg === 'string') {
        opts.auth = requestArgs.pop()
      } else if (Utils.isOptionsHash(arg)) {
        const params = requestArgs.pop()

        const extraKeys = Object.keys(params).filter((key) => !OPTIONS_KEYS.includes(key))
        if (extraKeys.length > 0) {
          throw new Error(
            `Zingle: Unrecognized option keys in options object ${extraKeys.join(', ')}`
          )
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

  // send axios request
  makeRequest: (
    resource: ZingleResource,
    requestArgs: any[],
    spec: ZingleMethodSpec,
    overrideData: Record<string, string|number>
  ): AxiosResponse => {
    /**
     * first args could be
     *  - string representing resource id for retrieval/update/deletion
     *  - hash representing body data
     *  - hash representing query data
     *
     * second to last arg could be per request options:
     *  - hash with request opts
     */
    const pathInterpolator = Utils.makeUrlInterpolator(spec.path || '')
    const encode = spec.encode || ((data: any): any => data)

    // extract relevant data from request arguments
    const urlData = ZingleRequest.buildUrlData(spec.urlParams || [], requestArgs)
    const argData = ZingleRequest.extractArgData(requestArgs)
    const optData = ZingleRequest.extractOptionsData(requestArgs)

    // build req params
    const requestMethod = (spec.method || 'GET').toUpperCase() as ZingleMethodSpec['method']
    const requestPath = resource.createPath(pathInterpolator, urlData)
    // build data object
    const data = encode({ ...argData, ...overrideData })
    // assign data to appropriate argument
    const dataInQuery = spec.method === 'GET' || spec.method === 'DELETE'
    const bodyData = dataInQuery ? {} : data
    const queryData = dataInQuery ? data : {}
    const headers = { ...optData.headers, ...spec.headers }

    // get default configuration for axios instance
    const createRequestInstance = resource.createRequestInstance()

    return createRequestInstance.request({
      method: requestMethod,
      url: requestPath,
      params: queryData,
      data: bodyData,
      headers: headers,
      ...(optData.auth ? { auth: optData.auth } : null), // either override or leave out
      ...(optData.timeout ? { timeout: optData.timeout } : null) // either override or leave out
    })
  }
}

export default ZingleRequest
