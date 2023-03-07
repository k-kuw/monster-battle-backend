const express = require("express");
const monsterController = require("../controllers/monster");

const router = express.Router();

router.get("/api/monsters", monsterController.getAllMonsters);

module.exports = router;
