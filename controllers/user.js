const Character = require("../models/character");
const User = require("../models/user");

exports.getAllCharacters = (req, res, next) => {
  Character.fetchAll()
    .then(([rows, _]) => {
      const characters = rows;
      res.status(200).send(characters);
    })
    .catch((err) => console.log(err));
};

exports.getUserInfo = (req, res, next) => {
  const userId = req.params.userId
  let userName;
  User.fetchMe(userId)
    .then(([rows, _]) => {
      const characterData = rows[0];
      const characterId = characterData.characterId;
      const ex = characterData.ex;
      userName = characterData.name;
      return { characterId, ex };
    })
    .then(({ characterId, ex }) => {
      let userData;
      Character.fetchMyStatus({ characterId, ex })
        .then(([rows, _]) => {
          rows[0].id = userId;
          rows[0].name = userName;
          // characterのlevel毎の必要exを、userのexに変更Ï
          rows[0].ex = ex;
          return rows[0];
        })
        .then((rows) => {
          userData = rows;
          Character.fetchCharacter(characterId).then(([rows, _]) => {
            userData.imageUrl = rows[0].imageUrl;
            res.status(200).send(userData);
          });
        });
    })
    .catch((err) => console.log(err));
};

exports.updateUserEx = (req, res, next) => {
  User.levelUp(req.body.id, req.body.ex)
    .then(() => {
      res.status(200).send("Success!");
    })
    .catch((err) => console.log(err));
};

exports.registerUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const characterId = req.body.characterId;

  const user = new User(name, email, password, characterId);

  user
    .save()
    .then(() => {
      res.status(200).send("Success!");
    })
    .catch((err) => console.log(err));
};

exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.login(email, password)
    .then(([rows, _]) => {
      if (!rows[0]) {
        res
          .status(400)
          .send({
            message: "ログインできませんでした。入力内容をご確認ください。",
          });
        return;
      }
      res.status(200).send(rows[0]);
    })
    .catch((err) => console.log(err));
};
