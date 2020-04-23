import { ZingleMethodSpec } from './ZingleMethod'
import { ZingleResource } from './ZingleResource'
import { Utils, Hash } from './Utils'

export const ZingleRequest = {
  buildRequestOptions: (
    self: ZingleResource,
    requestArgs: any[],
    spec: ZingleMethodSpec,
    overrideData: object): ZingleRequestOptions => {
    const method: ZingleMethodSpec['method'] = (spec.method || 'GET')
      .toUpperCase() as ZingleMethodSpec['method']
    const symbolicPath: string = self.createSymbolicRelativePath(spec.path) // ex. /contacts/{contact}
    const urlParams = spec.urlParams || []
    const encode = spec.encode || ((data: any): any => data)
    const host = spec.host || null
    const pathInterpolator = Utils.makeUrlInterpolator(spec.path || '')
    const args: any[] = Array.from(requestArgs) // copy request args

    // get request url data
    const urlData = urlParams.reduce((urlData: Hash, param: string) => {
      const arg = args.shift()
      if (typeof arg !== 'string') {
        throw new Error(
          `Zingle : Argument "${param}" must be a string, but got: ${arg} (on API request to \`${method} ${symbolicPath}\`)`
        )
      }

      urlData[param] = arg
      return urlData
    }, {})

    const dataFromArgs = Utils.getDataFromArgs(args)
    const data = encode({ ...dataFromArgs, ...overrideData })
    const options = Utils.getOptionsFromArgs(args)

    // Validate that there are no more args.
    if (args.filter((x) => x != null).length) {
      throw new Error(
      `Zingle: Unknown arguments (${args}). Did you mean to pass an options object? (on API request to ${method} \`${symbolicPath}\`)`
      )
    }

    // construct final request path
    const path = self.createFullPath(pathInterpolator, urlData)
    const headers = { ...options.headers, ...spec.headers }

    if (spec.validator) {
      spec.validator(data, { headers })
    }

    const dataInQuery = spec.method === 'GET' || spec.method === 'DELETE'
    const bodyData = dataInQuery ? {} : data
    const queryData = dataInQuery ? data : {}

    return {
      method,
      path,
      bodyData,
      queryData,
      auth: options.auth,
      headers,
      host,
      settings: options.settings
    }
  }
}

interface ZingleRequestOptions {
  method: ZingleMethodSpec['method'];
  path: string;
  bodyData: Hash;
  queryData: Hash;
  auth: string|null;
  headers: Hash;
  host: string|null;
  settings: Hash;
}
