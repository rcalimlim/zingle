/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-unused-expressions */
require('dotenv').config()
const chai = require('chai')
const { expect } = chai
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const nock = require('nock')
const Zingle = require('../lib/Zingle').default
const Resources = require('../lib/Resources').default
const Utils = require('../lib/Utils').default

// constants
const { ZINGLE_DEFAULTS } = require('../lib/Zingle')
const TEST_CONFIG = {
  username: 'johndoe@email.com',
  password: '12345'
}

describe('Zingle module', () => {
  before(() => {
    nock.disableNetConnect() // disable all net connections
    nock('https://api.zingle.me') // nock zingle api
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
      expect(zingle.createRequestInstance()).to.haveOwnProperty('defaults')
      expect(zingle.createRequestInstance().defaults).to.haveOwnProperty('timeout')
        .and.to.equal(ZINGLE_DEFAULTS.timeout)
      expect(zingle.createRequestInstance().defaults).to.haveOwnProperty('auth')
        .and.to.deep.equal({ username: TEST_CONFIG.username, password: TEST_CONFIG.password })
      expect(zingle.createRequestInstance().defaults).to.haveOwnProperty('baseURL')
        .and.to.equal(
          zingle.buildBaseUrl()
        )
    })

    it('should produce a request instance that includes default service id if specified', () => {
      const serviceId = 'abc123'
      const zingle = new Zingle({ ...TEST_CONFIG, serviceId })
      const baseUrl = 'https://api.zingle.me/v1/services/abc123'
      expect(zingle.createRequestInstance().defaults).to.haveOwnProperty('baseURL')
        .and.to.equal(baseUrl)
    })

    it('should produce a request instance with port config override', () => {
      const port = 8000
      const zingle = new Zingle({ ...TEST_CONFIG, port })
      const baseUrl = 'https://api.zingle.me:8000/v1'
      expect(zingle.createRequestInstance().defaults).to.haveOwnProperty('baseURL')
        .and.to.equal(baseUrl)
    })

    it('should accept a config object', () => {
      const zingle = new Zingle(TEST_CONFIG)
      const config = {
        username: 'fakeguy@email.com',
        password: 'fakepassword',
        timeout: 9999999,
        host: 'http://google.com',
        port: 123,
        basePath: 'v3',
        serviceId: 'fake9876'
      }
      expect(zingle.createRequestInstance(config).defaults).to.haveOwnProperty('auth')
        .and.to.deep.equal({ username: config.username, password: config.password })
      expect(zingle.createRequestInstance(config).defaults).to.haveOwnProperty('timeout')
        .and.to.equal(config.timeout)
      expect(zingle.createRequestInstance(config).defaults).to.haveOwnProperty('baseURL')
        .and
        .to
        .equal(zingle.buildBaseUrl(config.host, config.port, config.basePath, config.serviceId))
    })
  })

  describe('getters/setters', () => {
    it('has maxNetworkRetries', () => {
      const zingle = new Zingle(TEST_CONFIG)
      expect(zingle.maxNetworkRetries).to.exist.and.to.equal(ZINGLE_DEFAULTS.maxNetworkRetries)
    })

    it('has timeout', () => {
      const zingle = new Zingle(TEST_CONFIG)
      expect(zingle.timeout).to.exist.and.to.equal(ZINGLE_DEFAULTS.timeout)
    })

    it('has host', () => {
      const zingle = new Zingle(TEST_CONFIG)
      expect(zingle.host).to.exist.and.to.equal(ZINGLE_DEFAULTS.host)
    })

    it('has port', () => {
      const zingle = new Zingle(TEST_CONFIG)
      expect(zingle.port).to.exist.and.to.equal(ZINGLE_DEFAULTS.port)
    })

    it('has basePath', () => {
      const zingle = new Zingle(TEST_CONFIG)
      expect(zingle.basePath).to.exist.and.to.equal(ZINGLE_DEFAULTS.basePath)
    })

    it('has serviceId', () => {
      const zingle = new Zingle(TEST_CONFIG)
      expect(zingle.serviceId).to.equal(ZINGLE_DEFAULTS.serviceId)
    })

    it('should not allow access to username/password', () => {
      const zingle = new Zingle(TEST_CONFIG)
      expect(zingle.username).to.not.exist
      expect(zingle.password).to.not.exist
    })
  })

  // disabled because these are actual over the network calls
  xdescribe('network calls', () => {
    before(() => {
      nock.enableNetConnect()
    })
    after(() => {
      nock.disableNetConnect()
    })

    it('should list contacts without a config', (done) => {
      const username = process.env.ZINGLE_USERNAME || ''
      const password = process.env.ZINGLE_PASSWORD || ''
      const zingle = new Zingle({ username, password })

      const result = zingle.contacts.list()
      expect(result).to.eventually.haveOwnProperty('status')
      expect(result).to.eventually.haveOwnProperty('result')
        .notify(done)
    })
  })
})
