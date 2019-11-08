"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _default = (...fxs) => initialValue => {
  // var store = {}
  return (0, _ramda.pipe)((0, _ramda.reduce)((accStore, [alias, fx]) => {
    return { ...accStore,
      [alias]: fx(accStore)
    };
  }, initialValue))(fxs);
};

exports.default = _default;
"use strict";

var _evol = _interopRequireDefault(require("./fxs/evol"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('hi');

const hola = () => {
  return 'hi';
};
