const { expect } = require('chai')
const testVar = 'Hello, world!'

describe('Smoke test', () => {
  it('should work and pass', () => {
    expect(testVar).to.be.a('string').and.to.equal('Hello, world!')
  })
})
