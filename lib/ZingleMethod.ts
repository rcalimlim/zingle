import { ZingleResource } from './ZingleResource'

// Method namespace
const ZingleMethod = {

  // creates a resource method based on a spec
  generateMethod: (resource: ZingleResource, spec: ZingleMethodSpec): Function => {
    // TODO: create actual method that returns prepped axios request
    return (): null => null
  }

}

ZingleMethod.Common = {

}

export default ZingleMethod

export interface ZingleMethodSpec {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  methodType?: 'list';
  path?: string; // resource path
  host?: string; // host override if necessary
  encode?: Function; // data encoding function
}
