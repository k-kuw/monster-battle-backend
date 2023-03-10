const express = require("express");
const monsterController = require("../controllers/monster");

const router = express.Router();

// モンスター取得（対戦画面でのモンスター選択に使用）
router.get("/api/monsters", monsterController.getAllMonsters);

module.exports = router;
