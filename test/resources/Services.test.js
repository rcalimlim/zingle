/* eslint-disable no-unused-expressions */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const { expect } = chai
const { Zingle } = require('../../lib/Zingle')

const fullValidTestConfig = {
  username: 'johndoe@email.com',
  password: 'password1234',
  host: 'api.fakesite.com',
  port: '123',
  basePath: '/v1/',
  defaultServiceId: ''
}

describe('Services resource', () => {
  const zingle = new Zingle(fullValidTestConfig)
  it('should have a list method', () => {
    expect(zingle.services.list).to.exist
  })
  it('should have a retrieve method', () => {
    expect(zingle.services.retrieve).to.exist
  })
  it('should not have a create method', () => {
    expect(zingle.services.create).to.not.exist
  })
  it('should reference correct paths', () => {
    expect(zingle.services.basePath).to.equal(fullValidTestConfig.basePath)
    expect(zingle.services.resourcePath).to.equal('services')
  })
  it('should have promisifed methods', () => {
    return expect(zingle.services.list()).to.eventually.be.rejected
  })
})
