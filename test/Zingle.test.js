const { expect } = require('chai')
const nock = require('nock')
const axios = require('axios')

describe('Zingle object', () => {
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
})
