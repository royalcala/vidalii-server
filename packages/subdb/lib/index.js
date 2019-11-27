"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evolve2 = _interopRequireDefault(require("ramda/src/evolve"));

var _has2 = _interopRequireDefault(require("ramda/src/has"));

var _anyPass2 = _interopRequireDefault(require("ramda/src/anyPass"));

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultOptionsQuery = ({
  options,
  prefixConcat
}) => (0, _pipe2.default)((0, _ifElse2.default)((0, _anyPass2.default)([(0, _has2.default)('gt'), (0, _has2.default)('gte')]), opt => opt, opt => ({ //defautl if doesnt have, for get only his own fragment of docs
  ...opt,
  gte: '' //with the evolve(transformations) will add the prefix

})), (0, _ifElse2.default)((0, _anyPass2.default)([(0, _has2.default)('lt'), (0, _has2.default)('lte')]), opt => opt, opt => ({ //defautl if doesnt have
  ...opt,
  lte: ''
})), (0, _evolve2.default)({
  gt: prefixConcat,
  gte: prefixConcat,
  lt: prefixConcat,
  lte: prefixConcat
}))(options);

const main = ({
  prefix,
  separator = '!!'
}) => db => {
  const prefixConcat = key => prefix.concat(separator, key);

  return { ...db,
    put: (key, value, options = {}) => db.put(prefixConcat(key), value, options),
    get: (key, options = {}) => db.get(prefixConcat(key), options),
    del: (key, options = {}) => db.del(prefixConcat(key), options),
    createReadStreamP: (options = {}) => db.createReadStreamP(defaultOptionsQuery({
      options,
      prefixConcat
    })),
    iteratorP: (options = {}) => db.iteratorP(defaultOptionsQuery({
      options,
      prefixConcat
    }))
  };
};

var _default = main;
exports.default = _default;