// TODO
// rename file
// create proper testing for validating CI output

var fs = require('fs')
var mockFs = require('mock-fs')
var sharkci = require('../sharkci/lib')

  it('can get a token passed via env variable', function() {
    jest.setTimeout(10000)
    process.env.sharkci_token = 'abc123'
    expect(sharkci.upload({ options: { dump: true } }).query.token).toBe(
      'abc123'
    )
    delete process.env.sharkci_token
    process.env.sharkci_TOKEN = 'ABC123'
    expect(sharkci.upload({ options: { dump: true } }).query.token).toBe(
      'ABC123'
    )
    delete process.env.sharkci_TOKEN
  })
