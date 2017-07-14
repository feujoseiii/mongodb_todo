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


var Todo = mongoose.model('Todo', {
  text: { type: String },
  completed: { type: Boolean },
  completedAt: { type: Number }
});

var newTodo = new Todo({
  text: 'Cook dinner'
});

var newTodo1 = new Todo({
  text: 'Test 1',
  completed: false
});

newTodo1.save().then((res)=> {
  console.log('saved todo', res);
}, (err) => {
  console.log(err);
});
