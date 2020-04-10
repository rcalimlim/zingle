/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hash } from './utils'
import { Zingle } from './Zingle'
import {
  CommonMethodSpecs,
  ZingleMethodSpec
} from './ZingleMethod'

export class ZingleResource {
  constructor (zingle: Zingle) {
    this.zingle = zingle
    this.basePath = this.basePath || zingle.settings.basePath
  }

  private zingle: Zingle
  private CommonMethodSpecs = CommonMethodSpecs

  protected basePath: string|null = null
  protected resourcePath = '' // resource name
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
