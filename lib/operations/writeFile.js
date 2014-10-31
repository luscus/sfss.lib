var SFSSException = require('../exception'),
    path = require('path'),
    fs   = require('fs'),
    q    = require('q'),
    tools = require('../tools');

function writeFile (filePath, content) {

  var defered = q.defer(),
      dirPath = path.dirname(filePath),
      fileName =  path.basename(filePath);

  if (tools.checkExtention(filePath, this.options)) {
    var absolutFilePath = tools.handleDirectory(dirPath, this.options) + path.sep + fileName;

    if (typeof content !== 'string') {
      content = JSON.stringify(content, null, '  ');
    }

    fs.writeFile(absolutFilePath, content, function(error) {
      if (error) {
        defered.reject(error);
      }
      else {
        defered.resolve(filePath);
      }
    });
  }
  else {
    defered.reject(new Error('you have to provide a document with an "id" property'));
  }

  return defered.promise;
}

module.exports = writeFile;
