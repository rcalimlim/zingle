/* eslint-disable @typescript-eslint/no-explicit-any */
import ZingleResource from './ZingleResource'
import ZingleRequest from './ZingleRequest'
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
    // TODO: create actual method that returns prepped axios request
    return (...args: any[]): Promise<AxiosResponse> => {
      const symbolicPath = resource.createSymbolicResourcePath(spec.path || '')
      spec.urlParams = Utils.extractUrlParams(symbolicPath)

      return makeRequest(resource, args, spec, {})
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
