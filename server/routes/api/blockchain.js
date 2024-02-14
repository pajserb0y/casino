const express = require("express");
const router = express.Router();
const { getBalance } = require("../../controllers/blockchain");

router.get("/balance", [], getBalance);

module.exports = router;
