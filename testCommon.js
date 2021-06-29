/* testCommon.js  v1.1*/
'use strict';

var com = require("./Common.js");

var n = com.getArgsCount();
console.info("count = ", n, "\n");
if (n == 0) {
  Common.quit(9);
}

for (let i = 0; i < n; i++) {
  console.info(com.getArg(i));
}

var m = com.toInt(com.getArg(0));

switch (m) {
  case 1:
    com.printf("%d %f %f\n", -100, 4.567, 981.0);
    break;
  case 2:
    {
       let n = com.toInt("1024");
       console.log(n)
    }
  case 3:
    {
       let n = 1024;
       console.log(com.toStr(n));
    }
    break;
  case 4:
    console.log(com.getType(1));
    console.log(com.getType("1"));
    console.log(com.getType(true));
    console.log(com.getType(undefined));
    break;
  default:
    com.quit(1, "Not supported.");
    break;
}

console.info("Done.");
