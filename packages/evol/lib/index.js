"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "evol", {
  enumerable: true,
  get: function () {
    return _evol.default;
  }
});
Object.defineProperty(exports, "evolPipe", {
  enumerable: true,
  get: function () {
    return _evolPipe.default;
  }
});
Object.defineProperty(exports, "evolCompose", {
  enumerable: true,
  get: function () {
    return _evolCompose.default;
  }
});

var _evol = _interopRequireDefault(require("./fxs/evol"));

var _evolPipe = _interopRequireDefault(require("./fxs/evolPipe"));

var _evolCompose = _interopRequireDefault(require("./fxs/evolCompose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }