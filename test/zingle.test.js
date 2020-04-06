const { expect } = require('chai')
const { Zingle, ZingleConfigEnum } = require('../lib/zingle')

/**
 * Describes the main Zingle class and entrypoint for this app.
 */
describe('Zingle class', () => {
  describe('configuration validation', () => {
    const validateConfigFn = Zingle.prototype.validateConfig.bind(Zingle)
    it('should throw an error if instantiated without an argument', () => {
      expect(validateConfigFn).to.throw()
    })

    it('should throw an error with improper config options', () => {
      const badConfig = { badOption: 'string' }
      expect(validateConfigFn.bind(this, badConfig)).to.throw()
    })

    it('should throw an error with improper config values', () => {
      const badConfig = { port: 443 }
      expect(validateConfigFn.bind(this, badConfig)).to.throw()
    })

    it('should throw an error without a username and/or password', () => {
      const badConfig = {
        host: 'api.zingle.me',
        port: '443',
        basePath: '/v1/'
      }
      expect(validateConfigFn.bind(this, badConfig)).to.throw()
    })

    it('should return a config if only passed username and password', () => {
      const goodConfig = {
        username: 'johndoe@email.com',
        password: 'password1234'
      }
      expect(validateConfigFn(goodConfig)).to.be.an('object')
        .that.has.all.keys(ZingleConfigEnum)
    })

    it('should return same config if passed a valid config', () => {
      const goodConfig = {
        username: 'johndoe@email.com',
        password: 'password1234',
        host: 'api.fakesite.com',
        port: '123',
        basePath: '/v2/',
        defaultServiceId: ''
      }
      expect(validateConfigFn(goodConfig)).to.deep.equal(goodConfig)
    })
  })
})
