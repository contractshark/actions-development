/**
* ContractShark CI Provider / Services Detection
* @readonly {detectProvider}
*/

var services = {
//  travis: require('./env/travis'),
//  circle: require('./env/circle'),
//  gitlab: require('./env/gitlab'),
  github_actions: require('./env/github'),
}

/** 
* detectProvider
* @summary {detectProvider} function for CI Service
* @param {ParamDataTypeHere} parameterNameHere - 
* @return {ReturnValueDataTypeHere}  
*/

var detectProvider = function() {
  var config
  for (var name in services) {
    if (services[name].detect()) {
      config = services[name].configuration()
      break
    }
  }
  if (!config) {
    var local = require('./services/localGit')
    config = local.configuration()
    if (!config) {
      throw new Error('Unknown CI service provider. Unable to upload coverage.')
    }
  }
  return config
}

/**
 *  @exports detectProvider
 *  @version {versionNumberHere}
 */

module.exports = detectProvider
