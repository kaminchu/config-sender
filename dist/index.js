"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_commander2.default.version("0.0.0").usage("aaaaaa").option("-l, --list <n>", "add target").option("-t, --target <n>", "add target").option("-c, --config <n>", "add target").parse(process.argv);

var config = _commander2.default.config || _path2.default.join(process.cwd(), "config.json");
var listPath = _commander2.default.list || _path2.default.join(process.cwd(), "list.json");
var list = JSON.parse(_fs2.default.readFileSync(listPath, "utf8"));
var target = _commander2.default.target;
var plugins = (0, _lodash2.default)(list).map(function (e) {
  return e.type;
}).uniq().reduce(function (pre, e) {
  return _extends({}, pre, _defineProperty({}, e, require(config.plugins[e])));
}, {}).value();

var execChecker = function execChecker(e) {
  return "all" === target || e.name === target;
};

list.forEach(function (e) {
  if (execChecker(e)) {
    var configFile = getConfigFilePath(e.name);
    plugins[e.type].send(configFile, e.host, e.options);
  }
});

function getConfigFilePath(name) {
  var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "config";

  return _path2.default.join(process.cwd(), dir, name + ".config");
}