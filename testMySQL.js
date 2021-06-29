/* MySQL.js のテスト */
'use strict';

const mysql = require('./MySQL.js');

function test_getValue(from, to) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT max(sn) FROM Videos WHERE id BETWEEN ${from} AND ${to}`;
    mysql.getValue(sql, (n) => {
          if (n == undefined)
              reject(new Error("getValue Error"));
           else
              resolve(n);
     });
  });
}


test_getValue(1, 1000000).then(n => console.log("max(sn) = " + n)).catch(e => console.log(e.message));
test_getValue(1000000, 2000000).then(n => console.log("max(sn) = " + n)).catch(e => console.log(e.message));



function test_getRow(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT id, sn, path FROM Videos WHERE id = ${id}`;
    mysql.getRow(sql, (row) => {
       if (row == undefined) {
          reject(new Error("getRow のエラー"));
       }
       else {
          resolve(row);
       }
    });
  });
}

test_getRow(12449).then((row) => console.log(row.id, row.sn, row.path)).catch(e => console.log(e.message));
test_getRow(124490).then((row) => console.log(row.id, row.sn, row.path)).catch(e => console.log(e.message));


function test_query(album) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT id, path, sn FROM Videos WHERE album=${album}`;
    let result = [];
    mysql.query(sql, (row) => {
      if (row == undefined) {
        reject(new Error("query のエラー"));
      }
      else if (row == null) {
        resolve(result);
      }
      else {
        result.push(row);
      }
   });
 });
}


test_query(36).then((result) => {
  for (let row of result) {
      console.log(row);
    }
  })
  .catch((e) => console.log(e.message));


test_query(100000).then((result) => {
  for (let row of result) {
      console.log(row);
    }
  })
  .catch((e) => console.log(e.message));



function test_execute(id) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE Videos SET fav = 0 WHERE id = ${id}`;
    mysql.execute(sql, (o) => {
      if (typeof(o) == "Error") {
        reject(o);
      }
      else {
        resolve("execute OK");
      }
    });
  });
}


test_execute(12449).then(msg => console.log(msg)).catch(err => console.log(err.message));
test_execute(124490).then(msg => console.log(msg)).catch(err => console.log(err.message));



console.log("Done.");
