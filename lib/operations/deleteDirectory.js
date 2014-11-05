var SFSSException = require('../exception'),
    rimraf = require('rimraf'),
    fs   = require('fs'),
    q    = require('q'),
    tools = require('../tools');

function readDirectory (dirPath) {
  dirPath = dirPath || this.options.root;

  dirPath = tools.handleDirectory(dirPath, this.options);

  var _this = this,
      defered = q.defer();

  rimraf(dirPath, function (error, content) {
    if (error) {
      defered.reject(error);
    }
    else {
      defered.resolve(true);
    }
  });

  return defered.promise;
}

module.exports = readDirectory;
