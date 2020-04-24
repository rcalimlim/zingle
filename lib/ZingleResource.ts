/* eslint-disable @typescript-eslint/no-explicit-any */
import Zingle, { ZINGLE_DEFAULTS } from './Zingle'
import ZingleMethod, { CommonMethods } from './ZingleMethod'

const { generateMethod, CommonSpecs } = ZingleMethod
/**
 * Represents shared properties of all Zingle resources. Not to be instantiated directly.
 *
 * @param {object} zingle - Zingle instance to reference settings
 */
export class ZingleResource {
  constructor (zingle: Zingle) {
    this.zingle = zingle
    this.attachCommonMethods()
  }

  protected zingle: Zingle
  protected basePath: string = ZINGLE_DEFAULTS.basePath // default to top-level base path
  protected path = '' // the resource name set on each inheriting resource
  protected commonMethods: CommonMethods[] = [] // list of common methods inheriting resource has

  // declare intent for common methods
  public create: Function|undefined
  public list: Function|undefined
  public retrieve: Function|undefined
  public update: Function|undefined
  public del: Function|undefined

  // called on instantiation to attach zingle methods based on common methods list from resource
  private attachCommonMethods (): void {
    for (const method of this.commonMethods) {
      const spec = CommonSpecs[method]
      this[method] = generateMethod(this, spec)
    }
  }
}
