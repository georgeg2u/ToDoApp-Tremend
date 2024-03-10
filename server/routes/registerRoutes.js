const { createAccount } = require("../controllers/registerController");
const router = require("express").Router()

router.post('/', createAccount)

module.exports = router;