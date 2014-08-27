var _id = new Date().getTime();


var doc = {
      id: _id,
      type: 'testDoc',
      property: 'bla'
    },
    SimpleFsStorage = require('../lib/sfss.lib'),
    lib = new SimpleFsStorage({
      root: __dirname + '/' + 'root'
    });

console.log(lib);



console.log('-- WRITE TEST ----------------------');
lib.writeDoc('test/2/3/4', doc)
.catch(console.error);


console.log('-- READ TEST -----------------------');
lib.readDoc('test/'+ doc.id +'.json')
.then(console.log)
.catch(console.error);

console.log('-- BULK READ TEST ------------------');
lib.readDocs('test')
.then(console.log)
.catch(console.error);

console.log('-- READ DIRECTORY TEST -------------');
lib.readDirectoryContent('')
.then(console.log)
.catch(console.error);

console.log('-- NEGATIVE READ TEST --------------');
lib.readDoc('test/doesNotExist.json')
.then(console.log)
.catch(console.error);
