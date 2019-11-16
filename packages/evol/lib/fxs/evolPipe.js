"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// import { reduce } from 'ramda'
var _default = (...fxs) => fxReturnSelection => initialValues => {
  // var store = {}
  var evolution = fxs.reduce((accStore, [alias, fx]) => {
    return { ...accStore,
      [alias]: fx(accStore)
    };
  }, initialValues); // (fxs)

  return fxReturnSelection(evolution);
};

exports.default = _default;