const db = require("../util/database");

// モンスタークラス
module.exports = class Monster {
  // 全モンスターのDB取得
  static fetchAll() {
    return db.execute("SELECT * FROM monsters");
  }
};
