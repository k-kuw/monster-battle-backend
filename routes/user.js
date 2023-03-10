const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// キャラ取得（ユーザー登録時の使用キャラ設定に使用）
router.get("/api/characters", userController.getAllCharacters);

// ユーザー登録
router.post("/api/register", userController.registerUser);

// ログイン認証
router.post("/api/login", userController.loginUser);

// ログインしているユーザー情報の取得
router.get("/api/user/:userId", userController.getUserInfo);

// ユーザーの経験値アップ
router.post("/api/level", userController.updateUserEx);

module.exports = router;
