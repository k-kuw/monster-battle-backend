const db = require("../util/database");

module.exports = class Monster {
  constructor() {}
  static fetchAll() {
    return db.execute("SELECT * FROM monsters");
  }
};
