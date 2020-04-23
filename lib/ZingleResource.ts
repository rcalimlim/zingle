import Zingle, { ZINGLE_DEFAULTS } from './Zingle'

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

  // TODO: setup common methods in ZingleMethod
  protected commonMethods = []

  // called on instantiation to attach zingle methods based on common methods list from resource
  private attachCommonMethods (): void {
    //
  }
}
