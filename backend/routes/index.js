const router = require("express").Router();
const { authentication, authorization } = require("../middlewares/auth");

const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const boardRoute = require("./boardRoute");
const listRoute = require("./listRoute");
const taskRoute = require("./taskRoute");

router.use("/api/auth", authRoute);
router.use(authentication, authorization);
router.use("/api/user", userRoute);
router.use("/api/board", boardRoute);
router.use("/api/list", listRoute);
router.use("/api/task", taskRoute);

module.exports = router;
