import { Hash } from './Utils'

export class ZingleMethod {
  constructor (
    spec: ZingleMethodSpec,
    optionalUrlParams: Hash,
    callback: Function|null = null
  ) {
    this.spec = spec
    this.callback = callback
  }

  private spec: ZingleMethodSpec
  private callback: Function|null
}

export interface ZingleMethodSpec {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  urlParams: string[];
  encode: Function;
  host: string;
}
