var SFSSException = require('../exception'),
    path = require('path'),
    fs   = require('fs'),
    q    = require('q'),
    tools = require('../tools');

function readFile (filePath) {

  var defered = q.defer();

  if (tools.checkExtention(filePath, this.options)) {
    var dirPath = path.dirname(filePath),
        fileName = path.basename(filePath);

    var absolut = tools.handleDirectory(dirPath, this.options),
        filePath = path.sep + dirPath + path.sep + fileName,
        absolutFilePath = absolut + path.sep + fileName;

    fs.unlink(absolutFilePath, function (error) {
      if (error) {

        if (/^ENOENT, .*/.test(error.message)) {
          error = new SFSSException('file does not exist');
        }

        error.ref = filePath;

        defered.reject(error);
        return;
      }
      else {
        defered.resolve(true);
        return;
      }
    });
  }
  else {
    var error = new SFSSException('file is not from type allowed type: '+this.options.extentions);
    error.ref = filePath;

    defered.reject(error);
  }

  return defered.promise;
}

module.exports = readFile;

