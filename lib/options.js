
function check (options) {
  if (! options) {
    throw new SFSSOptionException('you have to specify options (see README)');
  }

  if (options === null || typeof options !== 'object') {
    throw new SFSSOptionException('parameter options has to be an Object (see README)');
  }


  if (! options.root) {
    throw new SFSSOptionException('missing "root" property: it defines the root directory of the storage');
  }
}

function SFSSOptionException (_message, _name) {
  this.name = _name || 'SFSSOptionException';
  this.message = _message;
}

module.exports = {
  check: function (options) {
    return check(options);
  }
};
