"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// import { reduceRight } from 'ramda'
var _default = (...fxs) => fxReturnSelection => (initialValues = {}) => {
  var evolution = fxs.reduceRight((acc, [alias, fx]) => {
    return { ...acc,
      [alias]: fx(acc)
    };
  }, initialValues);
  return fxReturnSelection(evolution);
};

exports.default = _default;