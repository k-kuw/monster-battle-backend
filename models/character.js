const db = require("../util/database");

// キャラクタークラス
module.exports = class Character {
  // 全キャラクターのDB取得
  static fetchAll() {
    return db.execute("SELECT * FROM characters");
  }

  // 特定キャラクターのDB取得
  static fetchCharacter(characterId) {
    return db.execute(`SELECT * FROM characters WHERE id=${characterId}`);
  }

  // キャラクターステータスのDB取得（characterIdにより特定のキャラクターテーブル取得）
  static fetchMyStatus({ characterId, ex }) {
    return db.execute(
      `SELECT * FROM character${characterId} WHERE ex <= ${ex} ORDER BY LEVEL DESC LIMIT 1`
    );
  }
};
