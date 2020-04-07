import { Hash } from './utils'
import { createZingleMethod } from './ZingleMethod'

export const CommonMethods: Hash = {
  create: createZingleMethod({
    method: 'POST'
  }),

  list: createZingleMethod({
    method: 'GET',
    methodType: 'list'
  }),

  retrieve: createZingleMethod({
    method: 'GET',
    path: '/{id}'
  }),

  update: createZingleMethod({
    method: 'POST',
    path: '{id}'
  }),

  // 'delete' is a reserved word in JavaScript
  del: createZingleMethod({
    method: 'DELETE',
    path: '{id}'
  })
}

export type ZingleCommonMethodsEnum = 'create' | 'list' | 'retrieve' | 'update' | 'del'
