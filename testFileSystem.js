/* testFileSystem.js  v1.1 */
'use strict';
const util = require('util');
const fso = require('./FileSystem.js');
const com = require('./Common.js');
const os = require('os');

if (com.isWindows()) {
  com.quit(1, "Linux で実行してください。");
}

if (process.argv.length < 3) {
  console.error("テスト番号を指定してください。");
  process.exit(9);
}

var no = parseInt(process.argv[process.argv.length - 1], 10);

const callback_getFiles = (files) => {
  for (let p of files) {
    console.info(p);
  }
  console.info('Done.');
}

const callback_getDirectories = (dirs) => {
  for (let d of dirs) {
    console.info(d);
  }
  console.info('Done.');
}

const callback_isDir = (b) => {
  console.info("isDir = " + b);
}

const callback_isFile = (b) => {
  console.info("isFile = " + b);
}

const callback_getSize = (size) => {
  console.info("size = ", size);
}

const callback_getDateTime = (dt) => {
  console.info(dt);
}

const callback_getAttr = (mode) => {
	console.info(util.format("%o", mode));
}

const callback_getAttrUnix = (mode) => {
	console.info(mode);
}

/* テスト開始 */
switch (no) {
  case 1:
    fso.getFiles('/home/user/bin', null, callback_getFiles);
    break;

  case 2:
    fso.getDirectories('/home/user/workspace', callback_getDirectories);
    break;

  case 3:
    fso.isDir("/usr/bin", callback_isDir);
    fso.isDir("/usr/bin/bash", callback_isDir);
    break;

  case 4:
    fso.isFile("/home/user/.bashrc", callback_isFile);
    fso.isFile("/home/user", callback_isFile);
    break;

  case 5:
    fso.getSize("/home/user/.bashrc", callback_getSize);
    break;

  case 6:
    fso.getDateTime("/var/www/html/index.html", callback_getDateTime, true);
    break;

  case 7:
    console.info(fso.getExtension("/usr/bin/bash"));
    console.info(fso.getExtension("/usr/etc/host.conf"));
    break;

  case 8:
    console.info(fso.getDirectory("/etc/apache2/mods-enabled/env.load"));
    break;

  case 9:
    console.info(fso.getFileName("/etc/apache2/mods-enabled/env.load"));
    break;

  case 10:
    fso.getAttr("/home/user/bin/rmcr", callback_getAttr);
    break;

  case 11:
    fso.getAttr("/home/user/bin/rmcr", callback_getAttrUnix, true);
    break;

  case 12: {
    let a = fso.getAttrSync("/home/user/bin/rmcr");
    console.info(util.format("%o", a));
    }
    break;

  case 13:  {
    let a = fso.getAttrSync("/home/user/bin/rmcr", true);
    console.info(a);
    }
    break;

  case 14:  {
    let a = fso.isLinkSync("/usr/bin/iconv");
    let b = fso.isLinkSync("/usr/bin/vi");
    console.info(a, b);
    }
    break;

  default:
    console.info("Not available. code=" + no);
    break;
}

