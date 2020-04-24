import { ZingleResource } from '../ZingleResource'
import Zingle from '../Zingle'
import { CommonMethods } from '../ZingleMethod'

export default class Contacts extends ZingleResource {
  constructor (zingle: Zingle) {
    super(zingle)

    this.attachCommonMethods()
    this.createInterpolators()
  }

  resourcePath = 'contacts'
  commonMethods: CommonMethods[] = ['create', 'list', 'retrieve', 'update', 'del']

  // TODO: add remaining special methods
}
