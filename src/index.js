import program from "commander";
import fs from "fs";
import _ from "lodash";
import path from "path";

program
.version("0.0.0")
.usage("aaaaaa")
.option("-l, --list <n>", "add target")
.option("-t, --target <n>", "add target")
.option("-c, --config <n>", "add target")
.parse(process.argv);

const config = program.config || path.join(process.cwd(), "config.json");
const listPath = program.list || path.join(process.cwd(), "list.json");
const list = JSON.parse(fs.readFileSync(listPath, "utf8"));
const target = program.target;
const plugins = _(list)
.map(e => e.type)
.uniq()
.reduce((pre, e) => ({...pre, [e]: require(config.plugins[e])}), {})
.value();

const execChecker = e => "all" === target || e.name === target ;

list.forEach(e => {
  if (execChecker(e)) {
    const configFile = getConfigFilePath(e.name);
    plugins[e.type].send(configFile, e.host, e.options);
  }
});


function getConfigFilePath(name, dir = "config"){
  return path.join(process.cwd(), dir, `${name}.config`);
}