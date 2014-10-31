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
- `strict`: {Boolean} if true, directories will have to be created using `createDirectory`.
- `extentions`: {ArrayString} holds the allowed file extentions. Default is: ['json']


## API

### readDirectory

Returns an Array holding only subdirectories and JSON files of the specified directory.

Parameter:
- `dirPath`: {String} relative directory path

### createDirectory

Returns an Array holding only subdirectories and JSON files of the specified directory.

Parameter:
- `dirPath`: {String} relative directory path



### readFile

Returns the content of the specified file.


Parameter
- `filePath`: {String} relative file path



### readFileBulk

Returns an Array with the content of all JSON files in the specified directory.

Parameter
- `dirPath`: {String} relative directory path



### writeFile

Writes a document at the specified location.

If the specified directory does not exist, it will be created by the method - and if `strict` mode is disable, any missing parent as well.

Parameters
- `filePath`: {String} relative directory path and file name
- `content`: {Object|String} file content
