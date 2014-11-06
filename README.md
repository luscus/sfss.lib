# Simple FS Storage Library
[![NPM version](https://badge.fury.io/js/sfss.lib.svg)](http://badge.fury.io/js/sfss.lib)
[![dependencies](https://david-dm.org/luscus/sfss.lib.svg)](https://david-dm.org/luscus/sfss.lib)
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
- `strict`: {Boolean} if true, directories will have to be created using `createDirectory`. Default is: `false`
- `extentions`: {ArrayString} holds the allowed file extentions. Default is: `['json']`


## API

### createDirectory

Creates a single directory - and if `strict` mode is disabled, any missing parent as well.

Parameter:
- `dirPath`: {String} relative directory path


### readDirectory

Returns an Array holding only subdirectories and JSON files of the specified directory.

Parameter:
- `dirPath`: {String} relative directory path


### deleteDirectory

Deep deletion of a directory (like rm -rf).

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

If the specified directory does not exist, it will be created by the method - and if `strict` mode is disabled, any missing parent as well.

Parameters
- `filePath`: {String} relative directory path and file name
- `content`: {Object|String} file content


### deleteFile

Removes the specified file.


Parameter
- `filePath`: {String} relative file path
