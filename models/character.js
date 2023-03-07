const db = require("../util/database");

module.exports = class Character {
  constructor() {}
  static fetchAll() {
    return db.execute("SELECT * FROM characters");
  }
  static fetchCharacter(characterId) {
    return db.execute(`SELECT * FROM characters WHERE id=${characterId}`);
  }

  static fetchMyStatus({ characterId, ex }) {
    return db.execute(
      `SELECT * FROM character${characterId} WHERE ex <= ${ex} ORDER BY LEVEL DESC LIMIT 1`
    );
  }
};
