"use strict";

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version().option("-t, --target", "add target").parse(process.argv);

if (!_commander2.default.args.length) {
  _commander2.default.help();
} else {
  console.log('Keywords: ' + _commander2.default.args);
}