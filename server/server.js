const bodyParser = require('body-parser');
const express = require('express');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');

//initial configurations
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());

//routes
app.post('/todos', (req, res) => {
  var todo = new Todo({
      text: req.body.text
  });

  todo.save().then((ret) => {
    res.send(ret);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.status(200).send({todos});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:todoID', (req, res) => {
  var todoID = req.params.todoID;
  if (ObjectID.isValid(todoID)) {
    Todo.findById(todoID).then((doc) => {
      if (doc) {
        res.status(200).send(doc);
      } else {
        res.status(404).send(doc);
      }
    }).catch((e) => {
      res.status(400).send();
    });
  } else {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);;
});

module.exports = { app }
