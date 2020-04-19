/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import { Hash, Utils } from './utils'
import { Zingle } from './Zingle'
import {
  CommonMethodSpecs,
  ZingleMethodSpec
} from './ZingleMethod'

export class ZingleResource {
  constructor (zingle: Zingle) {
    this.zingle = zingle
    this.basePath = this.basePath || zingle.settings.basePath
    this.basePathInterpolator = Utils.makeUrlInterpolator(this.basePath)
    this.resourcePathInterpolator = Utils.makeUrlInterpolator(this.resourcePath)
  }

  private zingle: Zingle
  private CommonMethodSpecs = CommonMethodSpecs

  protected basePath: string|null = null // usually /v1/
  protected resourcePath = '' // resource name, could be 'contacts', passed from inheriting resource class
  protected basePathInterpolator: Function
  protected resourcePathInterpolator: Function

  protected commonMethods: string[]|null = null // basic CRUD methods

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
      // attach array of url params for data replacement
      spec.urlParams = Utils.extractUrlParams(
        this.createSymbolicRelativePath(spec.path || '')
      )

      // TODO: substitute in ZingleRequest
      return new Promise((resolve, reject) => {
        if (args.length > 0) {
          resolve()
        } else {
          reject(new Error())
        }
      })
    }
  }

  /**
   * Create relative resource path (ex. /contacts/{contact})
   */
  public createSymbolicRelativePath (symbolicPath: string|undefined): string {
    return `/${path.join(this.resourcePath, symbolicPath || '')}`
  }

  /**
   * Creates a full resource request path (ex. /v1/contacts/1234)
   */
  public createFullPath (pathInterpolator: Function, urlData: Hash): string {
    return path.join(
      this.basePathInterpolator(urlData),
      this.resourcePathInterpolator(urlData),
      pathInterpolator(urlData)
    )
  }
}
