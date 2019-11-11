"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// import { reduceRight } from 'ramda'
var _default = (...fxs) => fxReturnSelection => initialValues => {
  // var store = {}
  // var evolution =
  //     reduceRight(
  //         (accStore, [alias, fx]) => {
  //             return {
  //                 ...accStore,
  //                 [alias]: fx(accStore)
  //             }
  //         },
  //         initialValues
  //     )(fxs)
  var evolution = fxs.reduceRight((acc, [alias, fx]) => {
    return { ...acc,
      [alias]: fx(acc)
    };
  }, initialValues);
  return fxReturnSelection(evolution);
};

exports.default = _default;