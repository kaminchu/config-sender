import program from "commander";
import fs from "fs";
import _ from "lodash";
import path from "path";

program
.version("0.0.0")
.usage("aaaaaa")
.option("-l, --list <n>", "add list")
.option("-t, --target <n>", "add target")
.option("-c, --config <n>", "add config")
.parse(process.argv);

const configPath = program.config || path.join(process.cwd(), "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
console.log(config);
const listPath = program.list || path.join(process.cwd(), "list.json");
const list = JSON.parse(fs.readFileSync(listPath, "utf8"));
const target = program.target;

const plugins = _(list)
.map(e => e.type)
.uniq()
.reduce((pre, e) => ({...pre, [e]: require(config.plugins[e])}), {});

const execChecker = e => "all" === target || e.name === target ;

list
.filter(e => execChecker(e))
.forEach(e => plugins[e.type].send(getConfigFilePath(e.name), e.host, e.options));


function getConfigFilePath(name, dir = "config"){
  return path.join(process.cwd(), dir, `${name}.config`);
}