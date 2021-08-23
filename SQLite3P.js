/* SQLite3P.js */
'use strict';
const sqlite3 = require("sqlite3");
const pathmod = require('path');

var db = null;

//　DB オブジェクトを作成
exports.create = (dbpath) => {
    let dbfile = (pathmod.dirname(__dirname) + "/" + dbpath).replace(/\\/g, "/");
    db = new sqlite3.Database(dbfile);
};

// SELECT を実行して結果のプロミスを返す。
exports.query_p = (sql) => {
    return new Promise((resolve, reject) =>{
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });    
    });
}

// クエリ結果のない SQL を実行する。
exports.execute_p = (sql) => {
    return new Promise((resolve, reject) =>{
        db.run(sql, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(null);
            }
        });
    });
}

// クエリ結果の 1 行のプロミスを返す。
exports.getRow_p = (sql) => {
    return new Promise((resolve, reject) => {
        db.each(sql, (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row);
            }
        });
    });
}

// クエリ結果のスカラーのプロミスを返す。必ずSELECT 文の 選択要素の名前を 'field'(フィールドの名称は自由) とすること。(AS field が必要)
//   (例) SELECT count(*) AS field FROM table1;
exports.getValue_p = (sql) => {
    let parts = sql.split(' ');
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row[parts[3]]);
            }
        })
    });
}