var bodyParser = require('bodyParser');
var express = require('express');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//initial configurations
var app = express();
var port = process.env || 3000;



app.listen(port, () => {
  return console.log(`Application is running at port ${port}`);
});
