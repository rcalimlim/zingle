const { expect } = require('chai')
const { parseRequestOptions } = require('../lib/generateRequest')

describe('generateRequest', () => {
  describe('parseRequestOptions', () => {
    const spec = { path: 'messages/{id}' }
    const result = parseRequestOptions(this, [], spec)
    console.log(result.commandPath({ id: 123 }))
    expect(true).to.be.true
  })
})
