const express = require("express");
const userRoutes = require("./routes/user");
const monsterRoutes = require("./routes/monster");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(monsterRoutes);

app.listen(3000);
