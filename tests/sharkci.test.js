// @file this is a stub file
// @dev just laying out inital testing properties and functionality
// @description inital validation of `sharkci.yml` or whatever config format

it('should have the correct version number', function() {
    var version = require('../package.json').version
    expect(sharkci.version).toBe('v' + version)
  })

  it('Should use sharkci.yml via env variable', function() {
    var CWD = process
      .cwd()
      .toString()
      .replace(/\\/g, '/')
    expect(
      sharkci
        .upload({ options: { dump: true, disable: 'detect' } })
        .query.yaml.toString()
        .replace(/\\/g, '/')
    ).toBe(CWD + '/sharkci.yml')

    mockFs({
      'foo.yml': '',
    })
    process.env.sharkci_yml = 'foo.yml'
    expect(
      sharkci
        .upload({ options: { dump: true, disable: 'detect' } })
        .query.yaml.toString()
        .replace(/\\/g, '/')
    ).toBe(CWD + '/foo.yml')
    mockFs.restore()
    delete process.env.sharkci_yml

    mockFs({
      'FOO.yml': '',
    })
    process.env.CONTRACTSHARK_YML = 'FOO.yml'
    expect(
      sharkci
        .upload({ options: { dump: true, disable: 'detect' } })
        .query.yaml.toString()
        .replace(/\\/g, '/')
    ).toBe(CWD + '/FOO.yml')
    mockFs.restore()
    delete process.env.CONTRACTSHARK_YML
  })

  it('can get config from cli args', function() {
    mockFs({
      'foo.yml': '',
    })
    var res = sharkci.upload({
      options: { dump: true, yml: 'foo.yml', disable: 'detect' },
    })
    var CWD = process
      .cwd()
      .toString()
      .replace(/\\/g, '/')
    expect(res.query.yaml.toString().replace(/\\/g, '/')).toBe(CWD + '/foo.yml')
    mockFs.restore()
  })

  it('can sanitize inputs', function() {
    expect(sharkci.sanitizeVar('real & run unsafe & command')).toEqual(
      'real  run unsafe  command'
    )
  })

  it('gracefully sanitizes undefined', function() {
    expect(function() {
      sharkci.sanitizeVar(undefined)
    }).not.toThrow()
  })
})
