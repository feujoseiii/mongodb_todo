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
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var samp = new User({
  email: 'feu.joseiii@gmail.com'
});

samp.save().then((res)=> {
  console.log('saved todo', res);
}, (err) => {
  console.log(err);
});
