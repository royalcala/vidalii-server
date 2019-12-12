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
  //         let s = '\xff' // \x hexadecimal ff last number
  // console.log('s::',s)
  lte: '\xff'
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

  const sizePrefix = prefix.concat(separator).length;

  const removePrefix = key => key.slice(sizePrefix);

  return { ...db,
    subdb: true,
    put: (key, value, options = {}) => db.put(prefixConcat(key), value, options),
    get: (key, options = {}) => db.get(prefixConcat(key), options),
    del: (key, options = {}) => db.del(prefixConcat(key), options),
    subPrefixConcat: prefixConcat,
    batch: (ops, options = {}) => {
      let prefixBatch = options.customPrefix ? options.customPrefix : prefixConcat;
      let opsWithKeyPrefix = ops.map(({
        type,
        key,
        value
      }) => ({
        type,
        key: prefixBatch(key),
        value
      }));
      console.log('opsWithKeyPrefix::', opsWithKeyPrefix);
      return db.batch(opsWithKeyPrefix, options);
    },
    // subPreBatch: ops => {
    //     let opsWithKeyPrefix = ops.map(
    //         ({ type, key, value }) => ({
    //             type,
    //             key: prefixConcat(key),
    //             value
    //         })
    //     )
    //     return opsWithKeyPrefix
    // },
    createReadStreamP: (options = {}) => db.createReadStreamP(defaultOptionsQuery({
      options,
      prefixConcat
    })),
    iteratorP: (options = {}) => {
      let defaults = defaultOptionsQuery({
        options: {
          keys: true,
          values: true,
          ...options
        },
        prefixConcat
      });

      if (defaults.hasOwnProperty('onData')) {
        let prevOnData = defaults.onData;
        if (defaults.values === true) //only one field::isString
          defaults.onData = data => {
            data.key = removePrefix(data.key);
            prevOnData(data);
          };else //with both field::isObject
          defaults.onData = key => {
            key = removePrefix(key);
            prevOnData(key);
          };
      }

      return db.iteratorP(defaults);
    }
  };
};

var _default = main;
exports.default = _default;