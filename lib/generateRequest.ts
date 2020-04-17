/* eslint-disable @typescript-eslint/no-explicit-any */
import { Utils, Hash } from './Utils'
import { ZingleMethodSpec } from './ZingleMethod'
import { ZingleResource } from './ZingleResource'
/**
 * parse request options
 *
 * requestMethod
 * requestPath
 * bodyData
 * queryData
 * auth
 * headers
 * host
 * settings
 *
 */

export const parseRequestOptions = (
  self: ZingleResource,
  requestArgs: any[],
  spec: ZingleMethodSpec,
  overrideData: object
) => {
  const commandPath = Utils.makeUrlInterpolator(spec.path || '')
  const requestMethod = (spec.method || 'GET').toUpperCase()
  const urlParams = spec.urlParams || []
  const encode = spec.encode || ((data: any): any => data)
  const host = spec.host
  const path = self.createResourcePathWithSymbols(spec.path)
  const args = Array.from(requestArgs)

  // Generate/validate url params
  const urlData = urlParams.reduce((urlData: Hash, param: string) => {
    const arg = args.shift()
    if (typeof arg !== 'string') {
      throw new Error(
        `Zingle: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`
      )
    }

    urlData[param] = arg
    return urlData
  }, {})

  const dataFromArgs = Utils.getDataFromArgs(args)
  const data = encode(Object.assign({}, dataFromArgs, overrideData))
  const options = Utils.getOptionsFromArgs(args)
}

export const generateRequest = () => {
  //
}
