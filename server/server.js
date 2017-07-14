const bodyParser = require('body-parser');
const express = require('express');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

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
    res.send({todos});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);;
});

module.exports = { app }
