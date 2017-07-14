const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoDB = mongoose.connect('mongodb://localhost:27017/TodoApp', {
  useMongoClient: true
});

mongoDB.then((res) => {
  console.log('Database has been connected');
}).catch((err) => {
  console.log('Unable to connect to database');
});


var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: 'Cook dinner'
});

newTodo.save().then((res)=> {
  console.log('saved todo');
}, (err) => {
  console.log(err);
});
