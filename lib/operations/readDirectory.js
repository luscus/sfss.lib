var SFSSException = require('../exception'),
    path = require('path'),
    fs   = require('fs'),
    q    = require('q'),
    tools = require('../tools');

function readDirectory (dirPath) {
  dirPath = dirPath || this.options.root;

  dirPath = tools.handleDirectory(dirPath, this.options);

  var _this = this,
      defered = q.defer();

  fs.readdir(dirPath, function (error, content) {
    if (error) {
      defered.reject(error);
    }
    else {
      var validContent = [];

      content.forEach(function(fileName){
        if (tools.checkExtention(fileName, _this.options)) {

          // valid file extention: add to list
          validContent.push(fileName);
        }
        else {

          // invalid file extention, could be a directory
          var contentPath = dirPath + path.sep + fileName;

          if (fs.lstatSync(contentPath).isDirectory()) {

            // directory: add to list
            validContent.push(fileName);
          }
        }
      });

      defered.resolve(validContent);
    }
  });

  return defered.promise;
}

module.exports = readDirectory;
