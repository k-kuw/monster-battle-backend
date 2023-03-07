const Monster = require("../models/monster");

exports.getAllMonsters = (req, res, next) => {
  Monster.fetchAll()
    .then(([rows, _]) => {
      const monsters = rows;
      res.status(200).send(monsters);
    })
    .catch((err) => console.log(err));
};
