import { Hash } from './Utils'

export const CommonMethodSpecs: Record<string, ZingleMethodSpec> = {
  create: {
    method: 'POST'
  },

  list: {
    method: 'GET',
    methodType: 'list'
  },

  retrieve: {
    method: 'GET',
    path: '/{id}'
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

export interface ZingleMethodSpec {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  methodType?: 'list';
  path?: string;
  urlParams?: string[];
  headers?: Hash;
  encode?: Function;
  host?: string;
  validator?: Function;
}

export type ZingleCommonMethodsEnum = 'create' | 'list' | 'retrieve' | 'update' | 'del'
