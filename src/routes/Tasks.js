const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController.js');


router.get("/", TaskController.findTask)
router.get("/:id", TaskController.findTaskById)
router.post("/", TaskController.createTask)
router.put("/:id", TaskController.updateTask) 
router.delete("/:id", TaskController.deleteTask)

module.exports = router;