const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.findAll);
router.get("/:id", taskController.findOne);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.destroy);

module.exports = router;
