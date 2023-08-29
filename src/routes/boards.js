const express = require('express')
const router = express.Router();
const BoardController = require("../controllers/boardController.js");
const { authentication } = require("../middlewares/auth.js");


router.get("/", authentication,BoardController.findBoard)
router.get("/:id", BoardController.findBoardById)
router.post("/", authentication,BoardController.createBoard)
router.put("/:id", authentication, BoardController.updateBoard)
router.delete("/:id", authentication, BoardController.deleteBoard)


module.exports = router;