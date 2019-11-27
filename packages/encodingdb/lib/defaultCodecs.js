"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _mergeDeepRight2 = _interopRequireDefault(require("ramda/src/mergeDeepRight"));

var _evolve2 = _interopRequireDefault(require("ramda/src/evolve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tryAndCatch = (typeEncoding, typeCode) => fxEncoding => dataToProcess => {
  try {
    var result = fxEncoding(dataToProcess);
    return result;
  } catch (e) {
    var msg = `Error in codecs:${typeEncoding}.${typeCode}, not match the structure defined.`;
    return {
      data: dataToProcess,
      error: {
        msg
      }
    };
  }
};

const addTryAndCatch = (0, _evolve2.default)({
  keyEncoding: {
    encode: tryAndCatch('key', 'encode'),
    decode: tryAndCatch('key', 'decode')
  },
  valueEncoding: {
    encode: tryAndCatch('value', 'encode'),
    decode: tryAndCatch('value', 'decode')
  }
});
const mergeWithDefaults = (0, _mergeDeepRight2.default)({
  keyEncoding: {
    encode: data => data,
    decode: data => data
  },
  valueEncoding: {
    encode: data => data,
    decode: data => data
  }
});

const getDefaultsCodecs = codec => (0, _pipe2.default)(mergeWithDefaults, addTryAndCatch)(codec);

var _default = getDefaultsCodecs;
exports.default = _default;