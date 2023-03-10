const Monster = require("../models/monster");

// モンスター取得（対戦画面でのモンスター選択に使用）
exports.getAllMonsters = (req, res, next) => {
  Monster.fetchAll()
    .then(([rows, _]) => {
      const monsters = rows;
      // モンスター情報の送信
      res.status(200).send(monsters);
    })
    .catch((err) => res.send.message("モンスター情報の取得に失敗しました"));
};
