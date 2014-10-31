var _id = new Date().getTime();


var SimpleFsStorage = require('../lib/sfss.lib'),
    doc = {
      id: _id,
      type: 'testDoc',
      property: 'bla'
    },
    lib = new SimpleFsStorage({
      root: __dirname + '/' + 'root'
    });



lib.writeFile('test/2/3/4/'+ doc.id +'.json', doc)
.then(function (result) {
  console.log('-- WRITE TEST ----------------------');
  console.log(result);
})
.catch(function (error) {
  console.log('-- WRITE TEST ----------------------');
  console.log(error.stack);
});


lib.readFile('test/2/3/4/'+ doc.id +'.json')
.then(function (result) {
  console.log('-- READ TEST -----------------------');
  console.log(result);
})
.catch(function (error) {
  console.log('-- READ TEST -----------------------');
  console.log(error.stack);
});

lib.readDirectory('test/2/3/4')
.then(function (result) {
  console.log('-- READ DIRECTORY TEST -------------');
  console.log(result);
})
.catch(function (error) {
  console.log('-- READ DIRECTORY TEST -------------');
  console.log(error.stack);
});


lib.readFileBulk('test/2/3/4')
.then(function (result) {
  console.log('-- BULK READ TEST ------------------');
  console.log(result);
})
.catch(function (error) {
  console.log('-- BULK READ TEST ------------------');
  console.log(error.stack);
});

lib.readFile('test/doesNotExist.json')
.then(function (result) {
  console.log('-- NEGATIVE READ TEST --------------');
  console.log(result);
})
.catch(function (error) {
  console.log('-- NEGATIVE READ TEST --------------');
  console.log(error);
});
