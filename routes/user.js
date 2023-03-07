const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/api/characters", userController.getAllCharacters);

router.post("/api/register", userController.registerUser);

router.post("/api/login", userController.loginUser);

router.get("/api/user/:userId", userController.getUserInfo);

router.post("/api/level", userController.updateUserEx);

module.exports = router;
