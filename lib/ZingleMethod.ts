/* eslint-disable @typescript-eslint/no-explicit-any */
import ZingleResource from './ZingleResource'
import ZingleRequest, { ZingleRequestSpec } from './ZingleRequest'
import Utils from './Utils'
import { AxiosResponse } from 'axios'

const CommonMethodSpecs: Record<CommonMethods, ZingleMethodSpec> = {
  create: {
    method: 'POST'
  },

  list: {
    method: 'GET',
    methodType: 'list'
  },

  retrieve: {
    method: 'GET',
    path: '{id}'
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

const { makeRequest } = ZingleRequest

// Method namespace
const ZingleMethod = {

  // creates a resource method based on a spec
  generateMethod: (resource: ZingleResource, spec: ZingleMethodSpec): Function => {
    return (...args: any[]): Promise<AxiosResponse> => {
      // TODO: parse everything before feeding to makeRequest
      const symbolicPath = resource.createSymbolicResourcePath(spec.path || '')
      spec.urlParams = Utils.extractUrlParams(symbolicPath)

      const requestArgs = Array.from(args)
      return makeRequest(resource, requestArgs, spec as ZingleRequestSpec, {})
    }
  },

  CommonSpecs: CommonMethodSpecs
}

export default ZingleMethod

export type CommonMethods = 'create' | 'list' | 'retrieve' | 'update' | 'del'

export interface ZingleMethodSpec {
  method: 'GET' | 'POST' | 'DELETE';
  methodType?: 'list';
  path?: string; // resource path
  host?: string; // host override if necessary
  encode?: Function; // data encoding function
  urlParams?: string[];
}

export interface ZingleRequestSpec extends ZingleMethodSpec {
  path: string; // resource path
  host: string; // host override if necessary
  encode: Function; // data encoding function
  urlParams: string[];
}
