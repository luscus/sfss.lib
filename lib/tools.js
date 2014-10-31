var path = require('path'),
    fs   = require('fs'),
    q    = require('q'),
    cache;

var SFSSException = require('./exception');

function checkOptions (options) {
  if (! options) {
    throw new SFSSException('you have to specify options (see README)', 'SFSSOptionException');
  }

  if (options === null || typeof options !== 'object') {
    throw new SFSSException('parameter options has to be an Object (see README)', 'SFSSOptionException');
  }


  if (! options.root) {
    throw new SFSSException('missing "root" property: it defines the root directory of the storage', 'SFSSOptionException');
  }

  options.extentions = options.extentions || ['json'];

  options.strict = (typeof options.strict === 'boolean' ? options.strict : false);
}



var handledDirectories = {};

function checkPath (dirPath, options) {
  var absolut,
      relative;

  if (path.normalize(dirPath).indexOf(options.root) < 0) {
    if (dirPath.indexOf(path.sep) === 0) {
      dirPath = dirPath.substring(1);
    }

    relative = dirPath;
    absolut = options.root + path.sep + dirPath;
  }
  else {
    throw new Error('Provide a relative path');
  }

  return {
    relative: relative,
    absolut: absolut
  };
}

function checkExtention (filePath, options) {
  var extention = path.extname(filePath).replace('.', '').toLowerCase();

  return (options.extentions.indexOf(extention) > -1);
}

function handleDirectory (dirPath, options) {

  if (dirPath === options.root) {
    return dirPath;
  }

  if (! handledDirectories[dirPath]) {
    var pathInfo = checkPath(dirPath, options),
        dirPath  = pathInfo.relative;

    if (! options.strict) {

      // if property "strict" is not set to true,
      // create required directories
      createDirectories(pathInfo.absolut);

      handledDirectories[pathInfo.relative] = pathInfo.absolut;
    }
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

function createDirectory (absolutPath) {

  if (! fs.existsSync(absolutPath)) {
    fs.mkdirSync(absolutPath);
  }
}


module.exports = {
  directories: handledDirectories,
  checkOptions: checkOptions,
  checkExtention: checkExtention,
  checkPath: checkPath,
  handleDirectory: handleDirectory,
  createDirectories: createDirectories,
  createDirectory: createDirectory
};
