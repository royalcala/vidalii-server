"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evolve2 = _interopRequireDefault(require("ramda/src/evolve"));

var _mergeDeepRight2 = _interopRequireDefault(require("ramda/src/mergeDeepRight"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  options,
  keyEncoding
}) => (0, _pipe2.default)((0, _mergeDeepRight2.default)({
  encode: true,
  keys: true,
  values: true,
  onData: data => data
}), (0, _evolve2.default)({
  gt: keyEncoding.encode,
  gte: keyEncoding.encode,
  lt: keyEncoding.encode,
  lte: keyEncoding.encode
}))(options);

exports.default = _default;