"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduce2 = _interopRequireDefault(require("ramda/src/reduce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (...fxs) => fxReturnSelection => initialValues => {
  // var store = {}
  var evolution = (0, _reduce2.default)((accStore, [alias, fx]) => {
    return { ...accStore,
      [alias]: fx(accStore)
    };
  }, initialValues)(fxs);
  return fxReturnSelection(evolution);
};

exports.default = _default;