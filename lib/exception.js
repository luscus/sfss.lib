var util = require('util');

function SFSSException (_message, _name) {
  this.name = _name || 'SFSSException';
  this.message = _message;
}
util.inherits(SFSSException, Error);

module.exports = SFSSException;
