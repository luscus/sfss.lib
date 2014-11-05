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



lib.createDirectory(doc.id.toString())
.then(function (result) {
  console.log('-- CREATE DIR '+doc.id+' SUCCESS ----------------------');
  console.log(result);

  lib.deleteDirectory(doc.id.toString())
  .then(function (result) {
    console.log('-- DELETED DIR '+doc.id+' SUCCESS ----------------------');
    console.log(result);
  })
  .catch(function (error) {
    console.log('-- DELETED DIR '+doc.id+' ERROR ----------------------');
    console.log(error.stack);
  });
})
.catch(function (error) {
  console.log('-- CREATE DIR '+doc.id+' ERROR ----------------------');
  console.log(error.stack);
});

lib.writeFile('test/'+ doc.id +'.json', doc)
.then(function (result) {
  console.log('-- WRITE test/'+ doc.id +'.json SUCCESS ----------------------');
  console.log(result);

  lib.deleteFile('test/'+ doc.id +'.json', doc)
  .then(function (result) {
    console.log('-- DELETE test/'+ doc.id +'.json SUCCESS ----------------------');
    console.log(result);
  })
  .catch(function (error) {
    console.log('-- DELETE test/'+ doc.id +'.json ERROR ----------------------');
    console.log(error.stack);
  });
})
.catch(function (error) {
  console.log('-- WRITE test/'+ doc.id +'.json ERROR ----------------------');
  console.log(error.stack);
});

lib.writeFile('test/2/3/4/'+ doc.id +'.json', doc)
.then(function (result) {
  console.log('-- WRITE test/2/3/4/'+ doc.id +'.json SUCCESS ----------------------');
  console.log(result);
})
.catch(function (error) {
  console.log('-- WRITE test/2/3/4/'+ doc.id +'.json ERROR ----------------------');
  console.log(error.stack);
});


lib.readFile('test/2/3/4/'+ doc.id +'.json')
.then(function (result) {
  console.log('-- READ test/2/3/4/'+ doc.id +'.json SUCCESS -----------------------');
  console.log(result);
})
.catch(function (error) {
  console.log('-- READ test/2/3/4/'+ doc.id +'.json ERROR -----------------------');
  console.log(error.stack);
});

lib.readDirectory('test/2/3/4')
.then(function (result) {
  console.log('-- READ DIRECTORY test/2/3/4 SUCCESS -------------');
  console.log(result);
})
.catch(function (error) {
  console.log('-- READ DIRECTORY test/2/3/4 ERROR -------------');
  console.log(error.stack);
});


lib.readFileBulk('test/2/3/4')
.then(function (result) {
  console.log('-- BULK READ test/2/3/4 SUCCESS ------------------');
  console.log(result);

  lib.deleteDirectory('test/2')
  .then(function (result) {
    console.log('-- DELETED DIR test/2 SUCCESS ----------------------');
    console.log(result);
  })
  .catch(function (error) {
    console.log('-- DELETED DIR test/2 ERROR ----------------------');
    console.log(error.stack);
  });
})
.catch(function (error) {
  console.log('-- BULK READ test/2/3/4 ERROR ------------------');
  console.log(error.stack);
});

lib.readFile('test/doesNotExist.json')
.then(function (result) {
  console.log('-- NEGATIVE READ test/doesNotExist.json ERROR --------------');
  console.log(result);
})
.catch(function (error) {
  console.log('-- NEGATIVE READ test/doesNotExist.json SUCCESS --------------');
  console.log(error);
});
