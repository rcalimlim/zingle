/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZingleResource } from './ZingleResource'

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

// Method namespace
const ZingleMethod = {

  // creates a resource method based on a spec
  generateMethod: (resource: ZingleResource, spec: ZingleMethodSpec): Function => {
    // TODO: create actual method that returns prepped axios request
    return (): null => null
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
}
