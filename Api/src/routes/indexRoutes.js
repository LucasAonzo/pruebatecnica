const { Router } = require("express");
const userHandlers = require("../handlers/userhandlers");
const taskHandlers = require("../handlers/taskhandlers");

const router = Router();

router.use("/users", userHandlers);
router.use("/tasks", taskHandlers);

module.exports = router;
