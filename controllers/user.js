const Character = require("../models/character");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// キャラ取得（ユーザー登録時の使用キャラ設定に使用）
exports.getAllCharacters = (req, res, next) => {
  Character.fetchAll()
    .then(([rows, _]) => {
      const characters = rows;
      // キャラ情報の送信
      res.status(200).send(characters);
    })
    .catch((err) =>
      res.status(404).send("キャラクター情報の取得に失敗しました")
    );
};

// ログインしているユーザー情報の取得
exports.getUserInfo = (req, res, next) => {
  // 動的パラメータuserIdを取得
  const userId = req.params.userId;

  // ユーザー名格納用
  let userName;

  // ユーザー情報の取得
  User.fetchMe(userId)
    .then(([rows, _]) => {
      const characterData = rows[0];
      const characterId = characterData.characterId;
      const ex = characterData.ex;
      userName = characterData.name;
      return { characterId, ex };
    })
    // 取得したユーザー情報にそのほかの情報を追加
    .then(({ characterId, ex }) => {
      // ユーザーデータ格納用
      let userData;
      // キャラクターIDと経験値を使用し、キャラクターのステータスを取得
      Character.fetchMyStatus({ characterId, ex })
        .then(([rows, _]) => {
          // キャラクターステータスにユーザー情報を追加
          rows[0].id = userId;
          rows[0].name = userName;
          // キャラクターのlevel毎の必要exを、ユーザーのexに変更
          rows[0].ex = ex;
          // ユーザー＋キャラクター情報をreturn
          return rows[0];
        })
        .then((rows) => {
          userData = rows;
          Character.fetchCharacter(characterId).then(([rows, _]) => {
            // ユーザー＋キャラクター情報に画像情報を追加
            userData.imageUrl = rows[0].imageUrl;
            // データの送信
            res.status(200).send(userData);
          });
        })
        .catch((err) =>
          res.status(404).send("キャラクターの画像取得に失敗しました")
        );
    })
    .catch((err) => res.status(404).send("ユーザー情報の取得に失敗しました"));
};

// ユーザーの経験値アップ
exports.updateUserEx = (req, res, next) => {
  // 受信したid, exを元にDBの情報更新
  User.levelUp(req.body.id, req.body.ex)
    .then(() => {
      res.status(200).send(`${req.body.ex}`);
    })
    .catch((err) => {
      res.status(400);
    });
};

// ユーザー登録
exports.registerUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const characterId = req.body.characterId;

  if (!name || !email || !password || !characterId) {
    res.status(400).send("入力項目全てに入力してください");
    return;
  }

  if (!email.includes("@")) {
    res.status(400).send("正確なメールアドレスを入力してください");
    return;
  }

  if (password.length < 6) {
    res.status(400).send("パスワードは6文字以上で入力してください");
    return;
  }

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  // 受信した情報をもとにUserインスタンスを作成
  const user = new User(name, email, hashedPassword, characterId);
  // Userインスタンスを保存
  user
    .save()
    .then(() => {
      res.status(200).send("登録に成功しました！");
    })
    .catch((err) =>
      res.status(404).send("登録できませんでした、再度お試しください")
    );
};

// ログイン認証
exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // 受信した情報を元にDB検索
  if (!email || !password) {
    res
      .status(400)
      .send("ログインできませんでした。入力内容をご確認ください。");
    return;
  }

  // レスポンス用のユーザーデータ格納
  let user;

  User.login(email)
    .then(([rows, _]) => {
      // DB検索に掛からなかった場合（rows[0]がundefined）、エラーを送信
      if (!rows[0]) {
        throw new Error(
          "ユーザーが見つかりませんでした。登録がお済みでない場合は、上記リンクからユーザー登録を行なってください。"
        );
      }

      // 入力パスワードとDBパスワード比較
      const comparedPassword = bcrypt.compare(password, rows[0].password);

      // ユーザーデータ格納
      user = rows[0];

      return comparedPassword;
    })
    .then((auth) => {
      // パスワード認証
      if (!auth) {
        throw new Error("パスワードが間違っています");
      }
      // DB検索がうまく行った場合、idと名前のデータを送信
      delete user.password;
      res.status(200).send(user);
    })
    .catch((err) => res.status(401).send(err.message));
};
