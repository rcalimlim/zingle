/* eslint-disable @typescript-eslint/no-explicit-any */
import { Zingle } from './Zingle'

export class ZingleResource {
  constructor (zingle: Zingle) {
    this.zingle = zingle
    this.path = ''
    this.basePath = null

    // attach resource's listed common methods to 'this'
    if (this.commonMethods) {
      this.commonMethods.forEach((methodName: string) => {
        (this as {[k: string]: any})[methodName] = (): void => { console.log() }
      })
    }
  }

  private zingle: Zingle
  protected path: string
  protected basePath: string|null
  protected commonMethods: string[]|null = null
}
