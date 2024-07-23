const router = require("express").Router();
const listController = require("../controllers/listController");

router.get("/", listController.findAll);
router.get("/:id", listController.findOne);
router.post("/", listController.create);
router.put("/:id", listController.update);
router.delete("/:id", listController.destroy);

module.exports = router;
