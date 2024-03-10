const { authenticateUser } = require("../controllers/authController");

const router = require("express").Router();

router.post("/", authenticateUser);

module.exports = router;