const { dir } = require("console");
const path = require("path");

console.log(__filename);//full path with file name
console.log(__dirname);// only full directory name
console.log(path.basename(__dirname));
console.log(path.basename(__filename));
console.log(path.extname("./app.js"));//.js
console.log(path.extname(__filename));//.js
console.log(path.parse(__filename));
let dirOBJ = path.parse(__filename);// path to object
console.log(dirOBJ.ext);
console.log(path.format(dirOBJ));
console.log(path.isAbsolute("./Lecture 6"));//false
console.log(path.isAbsolute(__dirname)); // true




