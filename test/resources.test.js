const { expect } = require('chai')
const { resources } = require('../lib/resources')

describe('Resource list', () => {
  it('should properly export resource class definitions', () => {
    const { Services } = resources
    const services = new Services()
    const ServicesClass = require('../lib/resources/Services').default

    expect(services).to.be.an.instanceof(ServicesClass)
    expect(services.path).to.exist.and.to.equal('services')
    expect(services.list).to.exist.and.to.be.a('function')
  })
})
