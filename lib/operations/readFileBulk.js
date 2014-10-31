var SFSSException = require('../exception'),
    path = require('path'),
    fs   = require('fs'),
    q    = require('q'),
    tools = require('../tools');

function readFileBulk (dirPath) {

  var _this = this,
      mainDefered = q.defer(),
      promises = [],
      contents = [];

  this.readDirectory(dirPath)
  .then(function (files) {
    var validFiles = [];

    files.forEach(function(fileName){
      if (path.extname(fileName) === '.json'){
        validFiles.push(fileName);
      }
    });


    for(var index in validFiles) {

      var file = validFiles[index],
          defered = q.defer(),
          filePath = dirPath + path.sep + file;

      //promises.push(defered.promise);
      promises.push(_this.readFile(filePath)
                    .then(function (content) {
                      contents.push(content);
                      defered.resolve(content);
                    })
                    .catch(function (error) {
                      defered.reject(error);
                    }));
    }

    q.allSettled(promises)
    .then(function (results) {
      mainDefered.resolve(contents);
    });
  })
  .catch(function (error) {
    mainDefered.reject(error);
  });

  return mainDefered.promise;
}

module.exports = readFileBulk;
