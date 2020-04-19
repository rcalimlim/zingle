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
  encode?: Function;
  host?: string;
}

export type ZingleCommonMethodsEnum = 'create' | 'list' | 'retrieve' | 'update' | 'del'
