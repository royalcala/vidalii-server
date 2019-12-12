"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _replace2 = _interopRequireDefault(require("ramda/src/replace"));

var _assoc2 = _interopRequireDefault(require("ramda/src/assoc"));

var _reduce2 = _interopRequireDefault(require("ramda/src/reduce"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = pathToRead => (0, _pipe2.default)(_fs.readdirSync, (0, _reduce2.default)((acc, fileName) => (0, _assoc2.default)((0, _replace2.default)('.js', '', fileName), require(pathToRead + '/' + fileName).default, acc), {}))(pathToRead); // export default {a:1,b:2};


exports.default = _default;