const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoDB = mongoose.connect('mongodb://localhost:27017/TodoDB', {
  useMongoClient: true
});

mongoDB.then((res) => {
  console.log('Database has been connected');
}).catch((err) => {
  console.log('Unable to connect to database');
});

module.exports = {mongoose};
