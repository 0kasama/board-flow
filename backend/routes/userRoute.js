const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.findOne);
router.put("/", userController.update);

module.exports = router;
