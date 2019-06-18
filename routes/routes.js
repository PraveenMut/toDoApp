// require initial dependencies
const express = require('express');
const router = express.Router();

// require model schema
const Tasks = require('../models/tasks')

// get all tasks
router.get('/tasks', (req, res) => {
  Tasks.find({}).then((foundTasks) => {
    console.log("tasks found:", foundTasks);
    return res.json(foundTasks);
  }).catch((err) => {
    console.log("error found", err);
    return res.json(err);
  });
});

// get single tasks
router.get('/tasks/:name', (req, res) => {
  const { name } = req.params;
  Tasks.findOne({name: name}).then((task) => {
    console.log("task:", task);
    return res.json(task);
  }).catch((err) => {
    console.log("error found:", err);
    return res.json(err);
  });
});

// create task

// update task

// delete task

module.exports = router;