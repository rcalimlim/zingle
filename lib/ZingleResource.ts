/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hash } from './utils'
import { Zingle } from './Zingle'
import { CommonMethods } from './ZingleCommonMethods'
import { createZingleMethod } from './ZingleMethod'

export class ZingleResource {
  constructor (zingle: Zingle) {
    this.zingle = zingle
    this.path = ''
    this.basePath = null

    // attach resource's listed common methods to 'this'
  }

  private zingle: Zingle

  protected basePath: string|null
  protected path: string
  protected commonMethods: string[]|null = null

  // expose method creator and common method functions
  public static createMethod = createZingleMethod
  public static CommonMethods = CommonMethods

  protected attachCommonMethods (): void {
    if (this.commonMethods) {
      this.commonMethods.forEach((methodName: string) => {
        (this as Hash)[methodName] = CommonMethods[methodName]
      })
    }
  }
}
