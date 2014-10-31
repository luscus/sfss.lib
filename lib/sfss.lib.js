var tools = require('./tools'),
    instance;


function SimpleFsStorage (_options) {
  tools.checkOptions(_options);

  if (! (this instanceof SimpleFsStorage)) {
    return new SimpleFsStorage(_options);
  }

  this.options = _options;
  this.cache = {};

  tools.createDirectories(this.options.root);
}


// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync(__dirname + '/operations/').forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');

    // add operation method to SimpleFsStorage prototype
    SimpleFsStorage.prototype[name] = require('./operations/' + file);
  }
});

module.exports = SimpleFsStorage;
