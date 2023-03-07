const db = require("../util/database");

module.exports = class User {
  constructor(name, email, password, characterId) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.characterId = characterId;
  }

  save() {
    return db.execute(
      "INSERT INTO users (name, email, password, characterId, ex) VALUES (?,?, ?,?,?)",
      [this.name, this.email, this.password, this.characterId, 0]
    );
  }

  static login(email, password) {
    return db.execute(
      `SELECT id, name FROM users WHERE email='${email}' AND password='${password}'`
    );
  }

  static fetchMe(userId) {
    return db.execute(`SELECT * FROM users WHERE id=${userId}`);
  }

  static levelUp(id, ex) {
    return db.execute(`UPDATE users SET ex = ex + ${ex} WHERE id=${id}`);
  }
};
