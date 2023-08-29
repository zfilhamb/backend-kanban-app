const express = require('express')
const router = express.Router();
const ListController = require("../controllers/listController.js");
const { authentication } = require("../middlewares/auth.js");


router.get("/", ListController.findList)
router.get("/:id", ListController.findListById)
router.post("/", authentication,ListController.createList)
router.put("/:id", authentication, ListController.updateList)
router.delete("/:id", authentication, ListController.deleteList)


module.exports = router;