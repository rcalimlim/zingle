import { Zingle } from './Zingle'

export class ZingleResource {
  constructor (zingle: Zingle) {
    this.zingle = zingle
    this.path = ''
    this.basePath = null
  }

  private zingle: Zingle
  protected path: string
  protected basePath: string|null
}
