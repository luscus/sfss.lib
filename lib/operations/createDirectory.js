var SFSSException = require('../exception'),
    path = require('path'),
    fs   = require('fs'),
    q    = require('q'),
    tools = require('../tools');

function createDirectory (dirPath) {
  var defered = q.defer(),
      absolutDirPath = tools.handleDirectory(dirPath, this.options);

  try {
    tools.createDirectory(absolutDirPath);
    defered.resolve(dirPath);
  }
  catch (error) {
    error.ref = dirPath;

    defered.reject(error);
  }

  return defered.promise;
}

module.exports = createDirectory;
