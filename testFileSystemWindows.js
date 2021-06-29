/* testFileSystem.js */
'use strict';
const util = require('util');
const fso = require('./FileSystem.js');

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
async function main(no) {
  switch (no) {
    case 1:
      fso.getFiles('c:/bin', ['.exe', '.bat', '.cmd'], callback_getFiles);
      break;
  
    case 2:
      fso.getDirectories('c:/Apps', callback_getDirectories);
      break;
  
    case 3:
      fso.isDir("c:/Windows", callback_isDir);
      break;
  
    case 4:
      fso.isFile("c:/Windows/win.ini", callback_isFile);
      break;
  
    case 5:
      fso.getSize("c:/Windows/win.ini", callback_getSize);
      break;
  
    case 6:
      fso.getDateTime("c:/Windows/win.ini", callback_getDateTime, true);
      break;
  
    case 7:
      console.info(fso.getExtension("c:/bin/hm.bat"));
      break;
  
    case 8:
      console.info(fso.getDirectory("c:/bin/hm.bat"));
      break;
  
    case 9:
      console.info(fso.getFileName("c:/bin/hm.bat"));
      break;
  
    case 10:
      fso.getAttr("c:/Windows/win.ini", callback_getAttr);
      break;
  
    case 11:
      fso.getAttr("c:/Windows/win.ini", callback_getAttrUnix, true);
      break;
  
    case 12: {
      let a = fso.getAttrSync("c:/Windows/win.ini");
      console.info(util.format("%o", a));
      }
      break;
  
    case 13:  {
      let a = fso.getAttrSync("c:/Windows/win.ini", true);
      console.info(a);
      }
      break;
  
    case 14:  {
      let a = fso.isLinkSync("c:/Windows/win.ini");
      let b = fso.isLinkSync("c:/nodejs");
      console.info(a, b);
      }
      break;
  
    case 15: {
      let files = await fso.getFiles_p("c:/bin");
      for (let f of files) {
        console.log(f);
      }
    }
    break;
  
    case 16: {
      let dirs = await fso.getDirectories_p("c:/Windows");
      for (let d of dirs) {
        console.log(d);
      }
    }
    break;
  
    default:
      console.info("Not available. code=" + no);
      break;
  }  
}

main(no);
