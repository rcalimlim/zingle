/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import { ZingleRequestSpec } from './ZingleMethod'
import ZingleResource from './ZingleResource'
import { OPTIONS_KEYS } from './Zingle'

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

  extractArgData: (requestArgs: any[]): Record<string, any> => {
    if (!Array.isArray(requestArgs) || !requestArgs[0] || typeof requestArgs[0] !== 'object') {
      return {}
    }

    if (!utils.isOptionsHash(requestArgs[0])) {
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

  // send axios request
  makeRequest: async (
    resource: ZingleResource,
    requestArgs: any[],
    spec: ZingleRequestSpec,
    overrideData: Record<string, string|number>
  ): Promise<AxiosResponse> => {
    // ! The idea here is to manipulate and remove elemtns from the req args as needed.
    /**
     * first args could be
     *  - string representing resource id for retrieval/update/deletion
     *  - hash representing body data
     *  - hash representing query data
     *
     * second to last arg could be per request options:
     *  - hash with request opts
     */

    // build urlData from spec urlParams and requestArgs to pass to full url builder
    const urlData = ZingleRequest.buildUrlData(spec.urlParams, requestArgs)
    const argData
  }
}

export default ZingleRequest
