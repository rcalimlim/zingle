const { expect } = require('chai')
const nock = require('nock')
const axios = require('axios')
const Zingle = require('../lib/Zingle').default

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
      expect(() => Zingle()).to.throw(
        /Zingle: Config must be an object containing a username and password/
      )
    })

    it('should only accept a config with at least a username and password', () => {
      expect(() => Zingle({})).to.throw(
        /Zingle: Config must be an object containing a username and password/
      )
    })
  })
})
