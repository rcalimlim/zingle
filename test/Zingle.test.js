/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const nock = require('nock')
const axios = require('axios')
const Zingle = require('../lib/Zingle').default
const Resources = require('../lib/Resources').default
const Utils = require('../lib/Utils').default
const path = require('path')

// constants
const { ZINGLE_DEFAULTS } = require('../lib/Zingle')
const TEST_CONFIG = {
  username: 'johndoe@email.com',
  password: '12345'
}

describe('Zingle module', () => {
  let scope
  before(() => {
    nock.disableNetConnect() // disable all net connections
    scope = nock('https://api.zingle.me') // nock zingle api
  })

  after(() => {
    nock.cleanAll() // clean up all nocks
    nock.enableNetConnect() // re-enable net connections
  })

  // begin tests
  describe('config object', () => {
    it('should require a config', () => {
      expect(() => new Zingle()).to.throw(
        /Zingle: Config must be an object containing a username and password/
      )
    })

    it('should only accept a config with at least a username and password', () => {
      expect(() => new Zingle({})).to.throw(
        /Zingle: Config must be an object containing a username and password/
      )

      expect(() => new Zingle(TEST_CONFIG)).to.not.throw()
    })

    it('should apply defaults correctly when not configured explicitly', () => {
      const zingle = new Zingle(TEST_CONFIG)
      expect(zingle._apiVersion).to.equal(ZINGLE_DEFAULTS.apiVersion)
      expect(zingle._maxNetworkRetries).to.equal(ZINGLE_DEFAULTS.maxNetworkRetries)
      expect(zingle._timeout).to.equal(ZINGLE_DEFAULTS.timeout)
      expect(zingle._host).to.equal(ZINGLE_DEFAULTS.host)
      expect(zingle._port).to.equal(ZINGLE_DEFAULTS.port)
      expect(zingle._basePath).to.equal(ZINGLE_DEFAULTS.basePath)
      expect(zingle._serviceId).to.equal(ZINGLE_DEFAULTS.serviceId)
    })
  })

  describe('resources', () => {
    it('should have all listed resources', () => {
      const zingle = new Zingle(TEST_CONFIG)
      const resources = Object.keys(Resources).map(Utils.pascalToCamelCase)
      for (const resourceName of resources) {
        expect(zingle[resourceName]).to.exist
      }
    })
  })

  describe('request instance', () => {
    it('should produce a default-configured request instance', () => {
      const zingle = new Zingle(TEST_CONFIG)
      expect(zingle.defaultRequestInstance()).to.haveOwnProperty('defaults')
      expect(zingle.defaultRequestInstance().defaults).to.haveOwnProperty('timeout')
        .and.to.equal(ZINGLE_DEFAULTS.timeout)
      expect(zingle.defaultRequestInstance().defaults).to.haveOwnProperty('auth')
        .and.to.deep.equal({ username: TEST_CONFIG.username, password: TEST_CONFIG.password })
      expect(zingle.defaultRequestInstance().defaults).to.haveOwnProperty('baseURL')
        .and.to.equal(path.join(ZINGLE_DEFAULTS.host, ZINGLE_DEFAULTS.basePath))
    })

    it('should produce a request instance that includes default service id if specified', () => {
      const serviceId = 'abc123'
      const zingle = new Zingle({ ...TEST_CONFIG, serviceId })
      const baseUrl = path
        .join(ZINGLE_DEFAULTS.host, ZINGLE_DEFAULTS.basePath, 'services', serviceId)
      expect(zingle.defaultRequestInstance().defaults).to.haveOwnProperty('baseURL')
        .and.to.equal(baseUrl)
    })
  })
})
