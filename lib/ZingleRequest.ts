import { ZingleMethodSpec } from './ZingleMethod'
import { ZingleResource } from './ZingleResource'
import { Utils, Hash } from './Utils'

export const ZingleRequest = {
  buildRequestOptions: (self: ZingleResource, requestArgs, spec, overrideData: object) => {
    // method (GET, POST)
    // path (relative symbolic path)
    // body (req body)
    // query (query params?)
    // auth
    // headers
    // host
    // settings ?

    const method: ZingleMethodSpec['method'] = (spec.method || 'GET').toUpperCase()
    const symbolicPath: string = self.createSymbolicRelativePath(spec.path) // ex. /contacts/{contact}
    const urlParams = spec.urlParams || []
    const encode = spec.encode || ((data: any): any => data)
    const host = spec.host
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

    // construct final request path
    const path = self.createFullPath(pathInterpolator, urlData)

    const dataFromArgs = Utils.getDataFromArgs(args)
    const data = encode({ ...dataFromArgs, ...overrideData })
    const options = Utils.getOptionsFromArgs(args) // TODO: fix

    return {
      method, path
    }
  }
}
