/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import { Utils, Hash } from './utils'
import { Zingle } from './Zingle'
import {
  CommonMethodSpecs,
  ZingleMethodSpec
} from './ZingleMethod'

export class ZingleResource {
  constructor (zingle: Zingle) {
    this.zingle = zingle
    this.basePath = this.basePath || zingle.settings.basePath
    this.resourcePath = this.path
    this.path = Utils.makeUrlInterpolator(this.path)
  }

  private zingle: Zingle
  private CommonMethodSpecs = CommonMethodSpecs

  protected basePath: string|null = null
  protected resourcePath = '' // resource name
  protected path = ''
  protected commonMethods: string[]|null = null

  /**
   * Attaches listed common methods to class instance. Must be run for each
   * resource class.
   */
  protected attachCommonMethods (): void {
    if (this.commonMethods) {
      this.commonMethods.forEach((methodName: string) => {
        (this as Hash)[methodName] = this.generateMethod(
          this.CommonMethodSpecs[methodName]
        )
      })
    }
  }

  protected generateMethod (spec: ZingleMethodSpec): Function {
    return (...args: any[]): Promise<any> => {
      // TODO: BUILD OUT METHOD
      return new Promise((resolve, reject) => {
        if (args.length > 0) {
          resolve(true)
        } else {
          reject(new Error())
        }
      })
    }
  }
}
