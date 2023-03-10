const express = require("express");
const userRoutes = require("./routes/user");
const monsterRoutes = require("./routes/monster");

const app = express();

// Vueからのpostデータを読み込む
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルート設定
app.use(userRoutes);
app.use(monsterRoutes);

app.listen(3000);
