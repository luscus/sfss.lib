
# Simple FS Storage Library
[![dependencies](https://david-dm.org/luscus/sfss.lib.png)](https://david-dm.org/luscus/sfss.lib)
[![devDependency Status](https://david-dm.org/luscus/sfss.lib/dev-status.svg?theme=shields.io)](https://david-dm.org/luscus/sfss.lib#info=devDependencies)

Stores each handled JSON Document as a .json file on the file system.

## Usage

### Instantiation
    var SimpleFsStorage = require('../lib/sfss.lib'),
        options = {
          root: __dirname + '/' + 'root'
        },
        store = new SimpleFsStorage(options);
### Options

- `root (mandatory)`: {String} absolut path to the root directory of the store.


## API

### readDirectoryContent

Returns an Array holding only subdirectories and JSON files of the specified directory.

Parameter:
- `dirPath`: {String} relative directory path



### readDoc

Returns the content of the specified file.


Parameter
- `filePath`: {String} relative file path



### readDocs

Returns an Array with the content of all JSON files in the specified directory.

Parameter
- `dirPath`: {String} relative directory path



### writeDoc

Writes a JSON document into the specified directory. The file name is provided by the `id` property of the document.

If the specified directory does not exist, it will be created by the method - any missing parent as well.

Parameters
- `dirPath`: {String} relative directory path
- `jsonDoc`: {Object} json object to be stored in the file
