var optionManager = require('./options'),
    utils = require('./utils'),
    instance;


function SimpleFsStorage (_options) {
  optionManager.check(_options);

  if (! (this instanceof SimpleFsStorage)) {
    console.log('no instance');
    return new SimpleFsStorage(_options);
  }

  this.options = _options;

  utils.createDirectories(this.options.root);
}

SimpleFsStorage.prototype.readDirectoryContent = function (dirPath) {
  return utils.readDirectoryContent(dirPath, this.options);
};

SimpleFsStorage.prototype.readDocs = function (dirPath) {
  return utils.readDocs(dirPath, this.options);
};

SimpleFsStorage.prototype.readDoc = function (filePath) {
  return utils.readDoc(filePath, this.options);
};

SimpleFsStorage.prototype.writeDoc = function (dirPath, jsonObject) {
  return utils.writeDoc(dirPath, jsonObject, this.options);
};


module.exports = SimpleFsStorage;
