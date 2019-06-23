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
router.post('/tasks', (req, res) => {
  const { name, description, completed } = req.body;
  Tasks.create({ name, description, completed }).then((newTask) => {
    console.log(newTask);
    return res.json(newTask);
  }).catch((err) => {
    console.log("Error Occured. The error is:", err);
    return res.json(err);
  })
})
// update task
router.put('/tasks/:name', (req, res) => {
  const { name } = req.params;
  const { description, completed } = req.body;
  console.log(name, description, completed);
  Tasks.findOne({name}).then((doc) => {
    doc.name = name;
    doc.description = description;
    doc.completed = completed;
    doc.save().then((updatedDoc) => { 
      res.send(`${updatedDoc} has been updated`);
    }).catch((saveException) => { console.log(saveException) })
  }).catch((err) => {
    res.json(err);
  });
});

// delete task
router.delete('/tasks/:name', (req,res) => {
  const { name } = req.params;
  Tasks.findOneAndDelete({name}).then((deletedTask) => {
    if(!deletedTask) return res.send(`${name} not found`);
    console.log(deletedTask)
    return res.send("Task Deleted!");
  }).catch((err) => {
    console.log(err);
    return res.json(err);
  })
})

// search tasks through like regex expressions
router.get('/tasks/search/:name', (req, res) => {
  const { name: searchParam } = req.params;
  Tasks.find({ name: { $regex: String(searchParam), $options: "i" } }).then((foundTasks) => {
    console.log("Tasks found", foundTasks);
    return res.send(foundTasks);
  }).catch((err) => { 
    console.log(err);
    return res.json(err);
  });
});

module.exports = router;