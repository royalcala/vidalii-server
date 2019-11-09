"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduce2 = _interopRequireDefault(require("ramda/src/reduce"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _cond2 = _interopRequireDefault(require("ramda/src/cond"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (...fxs) => initialValue => {
  var store = _cond2.default;
  return (0, _pipe2.default)((0, _reduce2.default)((accStore, [alias, fx]) => {
    return { ...accStore,
      [alias]: fx(accStore)
    };
  }, initialValue))(fxs);
};

exports.default = _default;
"use strict";

var _cond2 = _interopRequireDefault(require("ramda/src/cond"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('hi');
const hola = _cond2.default;
