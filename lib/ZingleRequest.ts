import { ZingleMethodSpec } from './ZingleMethod'
import { ZingleResource } from './ZingleResource'
import { Utils } from './Utils'

export const ZingleRequest = {
  buildRequestOptions: (self: ZingleResource, args, spec, overrides) => {
    // method (GET, POST)
    // path (relative symbolic path)
    // body (req body)
    // query (query params?)
    // auth
    // headers
    // host
    // settings ?

    const method: ZingleMethodSpec['method'] = (spec.method || 'GET').toUpperCase()
    const path: string = self.createSymbolicRelativePath(spec.path) // ex. /contacts/{contact}
    const urlParams = spec.urlParams || []
    const encode = spec.encode || ((data: any): any => data)
    const host = spec.host
    const pathInterpolator = Utils.makeUrlInterpolator(spec.path || '')
    const urlData = {}
    const requestPath = self.createFullPath(pathInterpolator, urlData)
  }
}
