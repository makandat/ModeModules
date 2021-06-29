/* testMySQL.js Promise バージョン */
const mysql = require('./MySQL');
const com = require('./Common');

async function main(n) {
  switch (n) {
    case 1:  // Callback query
      mysql.query('SELECT id, album, title FROM Videos WHERE id < 100', (row, fields) => {
        if (row != null) {
          console.log(row.id, row.album, row.title);
        }
        else {
          console.log("Done.");
        }
      });
      break;
    case 2: {  // Promise query
      let res = await mysql.query_p('SELECT id, album, title FROM Videos WHERE id < 100');
      for (row of res) {
        console.log(row.id, row.album, row.title);
      }
      com.quit();
    }
    break;
    case 3:  // Callback execute
      mysql.execute("UPDATE Videos SET title='UNDEFINED' WHERE id = 0", (error) => {
        if (error == null) {
          console.log("OK.");
        }
        else {
          console.log(error.message);
        }
      });
      break;
    case 4: {  // Promise execute
      // エラーハンドリングをする場合
      await mysql.execute_p("UPDATE Videos SET title='UNDEFINED' WHERE id = 0")
        .catch((err) => {
          console.log(error.message);
        })
        .then((result) => {
          console.log("OK.");
        });
      }
      break;
    case 5:  // Callback getValue
      mysql.getValue("SELECT MAX(id) FROM Videos", (value) => {
        console.log(value);
      });
      break;
    case 6:  // Promise getValue
      // エラーハンドリングをする場合
      await mysql.getValue_p("SELECT MAX(id) FROM Videos")
        .catch ((err) => { console.log(err.message); })
        .then ((value) => { console.log(value); });
      // エラーハンドリングをしない場合
      let maxId = await mysql.getValue_p("SELECT MAX(id) FROM Videos");
      console.log(maxId);
      break;
    case 7:  // Callback getRow
      mysql.getRow("SELECT id, album, title FROM Videos WHERE id = 1000", (row) => {
        console.log(row.id, row.album, row.title);
      });
      break;
    case 8: {  // Promise getRow
      // エラーハンドリングをする場合
      await mysql.getRow_p("SELECT id, album, title FROM Videos WHERE id = 1000")
        .catch ((err) => { console.log(err.message); })
        .then ((row) => { console.log(row.id, row.album, row.title); });
      // エラーハンドリングをしない場合
      let row = await mysql.getRow_p("SELECT id, album, title FROM Videos WHERE id = 1000");
      console.log(row.id, row.album, row.title);
    }
    break;
    default:
      com.quit(1, "エラー： テスト番号が間違っています。");
      break;
  }
  console.info('Done');
}

/* Start */
if (com.getArgsCount() == 0) {
  com.quit(1, "エラー： テスト番号がありません。");
}
let n = com.toInt(com.getArg(0));
main(n);
