/* eslint-disable @typescript-eslint/no-explicit-any */
import Zingle, { ZINGLE_DEFAULTS } from './Zingle'
import ZingleMethod, { CommonMethods } from './ZingleMethod'
import Utils from './Utils'

import path = require('path')

const { generateMethod, CommonSpecs } = ZingleMethod

/**
 * Represents shared properties of all Zingle resources. Not to be instantiated directly.
 *
 * @param {object} zingle - Zingle instance to reference settings
 */
export default class ZingleResource {
  constructor (zingle: Zingle) {
    this.zingle = zingle
    this.createRequestInstance = zingle.createRequestInstance.bind(zingle)
  }

  protected zingle: Zingle
  protected basePath: string = ZINGLE_DEFAULTS.basePath // default to top-level base path
  protected resourcePath = '' // the resource name set on each inheriting resource
  protected commonMethods: CommonMethods[] = [] // list of common methods inheriting resource has
  protected interpolators: Record<string, Function> = { // holds basePath and path interpolators
    basePath: () => this.basePath,
    resourcePath: () => this.resourcePath
  }

  // declare intent for common methods
  public create: Function|undefined
  public list: Function|undefined
  public retrieve: Function|undefined
  public update: Function|undefined
  public del: Function|undefined

  // declare intent for default config axios instance
  public createRequestInstance: Function

  /**
   * Must be called in all inheriting Resource constructors to attach listed common methods.
   */
  protected attachCommonMethods (): void {
    for (const method of this.commonMethods) {
      const spec = CommonSpecs[method]
      this[method] = generateMethod(this, spec)
    }
  }

  /**
   * Must be called in all inheriting Resource constructors to setup URL interpolator functions.
   */
  protected createInterpolators (): void {
    this.interpolators.basePath = Utils.makeUrlInterpolator(this.basePath)
    this.interpolators.resourcePath = Utils.makeUrlInterpolator(this.resourcePath)
  }

  /**
   * Builds a symbolic path string from resource path and passed command path. Really only used
   * to show the path in an error.
   *
   * @param {string} symbolicPath - spec path of a resource method
   * @returns {string} - ex. '/contacts/{id}'
   */
  public createSymbolicResourcePath (symbolicPath: string): string {
    return path.join('/', this.resourcePath, symbolicPath || '')
  }

  /**
   * Outputs a fully interpolated method path based on URL data.
   *
   * @param {Function} pathInterpolator - interpolator function created from resource spec path
   * @param {object} urlData - Hash object of URL data that should be subbed in for symbols
   * @returns {string} - ex. '/contacts/1234/tag/567'
   */
  public createPath (
    pathInterpolator: Function,
    urlData: Record<string, string|number>
  ): string {
    return path
      .join(
        '/',
        this.interpolators.resourcePath(urlData),
        pathInterpolator(urlData)
      )
  }
}
