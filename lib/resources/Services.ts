import { Zingle } from '../Zingle'
import { ZingleResource } from '../ZingleResource'

export default class Services extends ZingleResource {
  constructor (zingle: Zingle) {
    super(zingle)
    this.resourcePath = 'services'
    this.commonMethods = ['list', 'retrieve']
    this.attachCommonMethods()
  }
}
