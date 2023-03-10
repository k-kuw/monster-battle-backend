const db = require("../util/database");

// ユーザークラス
module.exports = class User {
  constructor(name, email, password, characterId) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.characterId = characterId;
  }

  // 新規ユーザーのDB挿入
  save() {
    return db.execute(
      "INSERT INTO users (name, email, password, characterId, ex) VALUES (?,?, ?,?,?)",
      [this.name, this.email, this.password, this.characterId, 0]
    );
  }

  // ログイン時、DBとの認証
  static login(email) {
    return db.execute(
      `SELECT id, name, password FROM users WHERE email='${email}'`
    );
  }

  // ユーザーデータDB取得
  static fetchMe(userId) {
    return db.execute(`SELECT * FROM users WHERE id=${userId}`);
  }
  
  // 経験値DB更新
  static levelUp(id, ex) {
    return db.execute(`UPDATE users SET ex = ex + ${ex} WHERE id=${id}`);
  }
};
