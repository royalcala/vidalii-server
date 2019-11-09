"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduce2 = _interopRequireDefault(require("ramda/src/reduce"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (...fxs) => selection => connection => {
  // var store = {}
  var evolution = (0, _pipe2.default)((0, _reduce2.default)((accStore, [alias, fx]) => {
    return { ...accStore,
      [alias]: fx(accStore)
    };
  }, connection))(fxs);
  return selection(evolution);
};

exports.default = _default;