"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concat = exports.mergeById = exports.mergeByIndex = void 0;

var _concat2 = _interopRequireDefault(require("ramda/src/concat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mergeByIndex = () => '';

exports.mergeByIndex = mergeByIndex;

const mergeById = () => '';

exports.mergeById = mergeById;

const concat = (k, prevValue, newValue) => (0, _concat2.default)(prevValue, newValue);

exports.concat = concat;