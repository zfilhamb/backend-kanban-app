const express = require("express");
const router = express.Router();
const listRouter = require("./lists.js");
const userRouter = require("./user.js");
const taskRouter = require("./Tasks.js");
const boardRouter = require("./boards.js");

router.use("/lists", listRouter);
router.use("/boards", boardRouter);
router.use("/users", userRouter);
router.use("/tasks", taskRouter);

module.exports = router;