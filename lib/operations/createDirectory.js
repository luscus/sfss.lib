var SFSSException = require('../exception'),
    path = require('path'),
    fs   = require('fs'),
    q    = require('q'),
    tools = require('../tools');

function createDirectory (dirPath) {
  dirPath = tools.handleDirectory(dirPath, this.options);

  var pathInfo = tools.checkPath(dirPath, this.options);

  var defered = q.defer();

  try {
    tools.createDirectory(pathInfo.absolut);
    defered.resolve(dirPath);
  }
  catch (error) {
    error.ref = dirPath;

    defered.reject(error);
  }

  return defered.promise;
}

module.exports = createDirectory;
