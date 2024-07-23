const router = require("express").Router();
const boardController = require("../controllers/boardController");

router.get("/", boardController.findAll);
router.get("/:id", boardController.findOne);
router.post("/", boardController.create);
router.put("/:id", boardController.update);
router.delete("/:id", boardController.destroy);

module.exports = router;
