var path = require('path'),
    fs   = require('fs'),
    q    = require('q');

function readDirectoryContent (dirPath, options) {
  dirPath = dirPath || options.root;

  dirPath = handleDirectory(dirPath, options);

  var defered = q.defer();

  fs.readdir(dirPath, function (error, content) {
    if (error) {
      defered.reject(error);
    }
    else {
      var validContent = [];

      content.forEach(function(fileName){
        if (path.extname(fileName) === '.json'){
          validContent.push(fileName);
        }
        else {
          var contentPath = dirPath + path.sep + fileName;

          if (fs.lstatSync(contentPath).isDirectory()) {
            validContent.push(fileName);
          }
        }
      });

      defered.resolve(validContent);
    }
  });

  return defered.promise;
}

function readDocs (dirPath, options) {

  var mainDefered = q.defer(),
      promises = [],
      contents = [];

  readDirectoryContent(dirPath, options)
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
      promises.push(readDoc(filePath, options)
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

function readDoc (filePath, options) {
  var defered = q.defer();

  if (path.extname(filePath) === '.json'){
    var dirPath = path.dirname(filePath),
        fileName = path.basename(filePath);

    var absolut = handleDirectory(dirPath, options),
        absolutFilePath = absolut + path.sep + fileName;

    fs.readFile(absolutFilePath, {encoding:'utf8'}, function (error, content) {
      if (error) {
        defered.reject(error);
      }
      else {

        var data = {
          _id: filePath,
          type: 'fileContent',
          doc: JSON.parse(content)
        };

        defered.resolve(data);
      }
    });
  }
  else {
    defered.reject(new Error(filePath + ' is no JSON file'));
  }

  return defered.promise;
}

function writeDoc (dirPath, jsonDoc, options) {

  var defered = q.defer();

  if (jsonDoc.id){
    var absolut = handleDirectory(dirPath, options);
    var filePath = absolut + path.sep + jsonDoc.id + '.json';

    fs.writeFile(filePath, JSON.stringify(jsonDoc, null, '  '), function(error) {
      if (error) {
        defered.reject(error);
      }
      else {
        var data = {
          _id: filePath,
          type: 'fileContent',
          doc: jsonDoc
        };

        defered.resolve(data);
      }
    });
  }
  else {
    defered.reject(new Error('you have to provide a document with an "id" property'));
  }

  return defered.promise;
}

var handledDirectories = {};

function checkPath (dirPath, options) {
  var absolut,
      relative;

  if (dirPath.indexOf(options.root) < 0) {
    if (dirPath.indexOf(path.sep) === 0) {
      dirPath = dirPath.substring(1);
    }

    relative = dirPath;
    absolut = options.root + path.sep + dirPath;
  }

  return {
    relative:relative,
    absolut:absolut
  };
}

function createDirectory (dirPath) {

  if (! fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

function handleDirectory (dirPath, options) {

  if (dirPath === options.root) {
    return dirPath;
  }

  if (! handledDirectories[dirPath]) {
    var pathInfo = checkPath(dirPath, options),
        dirPath  = pathInfo.relative;

    createDirectories(pathInfo.absolut);

    handledDirectories[pathInfo.relative] = pathInfo.absolut;
  }

  return handledDirectories[dirPath];
}

function createDirectories (absolutPath) {
  var dirs = absolutPath.split(path.sep),
      root = '';

  dirs.forEach(function (dir, index) {
    root += path.sep + dir;

    createDirectory(root);
  });
}


module.exports = {
  directories: handledDirectories,
  createDirectories: function (options) {
    return createDirectories(options);
  },
  readDirectoryContent: function (dirPath, options) {
    return readDirectoryContent(dirPath, options);
  },
  readDirectoryContent: function (dirPath, options) {
    return readDirectoryContent(dirPath, options);
  },
  readDocs: function (dirPath, options) {
    return readDocs(dirPath, options);
  },
  readDoc: function (filePath, options) {
    return readDoc(filePath, options);
  },
  writeDoc: function (filePath, jsonDoc, options) {
    return writeDoc(filePath, jsonDoc, options);
  }
};
