const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Unable to connect to database");
  }
  console.log("Connected to the database");

  // db.collection('Todos')
  // .find({completed: true}).toArray()
  // .then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todo ',err);
  // });

  db.collection('Users').find({name: 'Jose'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log(err);
  });

  //db.close();
});
