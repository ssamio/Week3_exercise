var express = require('express');
var router = express.Router();
const backend = require("../todoBackend")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My todos' });
});

//POST for adding task
router.post('/todo', function(req, res) {
  let payloadName = req.body.name;
  let payloadTask = req.body.todo;
  response = backend.saveTodo(payloadName, payloadTask);
  res.send(response);
});

//GET for user and their todos
router.get('/user/:id', function(req, res){
  let response = backend.searchByUser(req.params.id);
  if (response == -1){
    res.send('User not found')
  }
  else {
    res.send(response);
  }
});

//DELETE for user
router.delete('/user/:id', function(req, res){
  let response = backend.deleteUser(req.params.id);
  if (response == -1){
    res.send('User not found');
  }
  else {
    res.send('User deleted');
  }
});

//PUT for deleting task
router.put('/user', function(req, res){
  let payloadName = req.body.name;
  let payloadTarget = req.body.todo;
  let response = backend.updateTaskList(payloadName, payloadTarget);
  if (response == -1){
    res.send('User not found');
  }
  else {
    res.send(response);
  }
});

module.exports = router;
