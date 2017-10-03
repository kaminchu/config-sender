import program from "commander";
import fs from "fs";

program
.version("0.0.0")
.usage("aaaaaa")
.option("-t, --target <n>", "add target")
.parse(process.argv);

const target = program.target || "./target.json";

var obj = JSON.parse(fs.readFileSync(target, 'utf8'));


console.log('Keywords: ' + JSON.stringify(obj));
console.log('target: ' + program.target);


// if(!program.args.length) {
//   program.help();
// } else {

// }