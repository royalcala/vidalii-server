"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaultCodecs = _interopRequireDefault(require("./defaultCodecs"));

var _conditionalQuery = _interopRequireDefault(require("./conditionalQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { curry } from 'ramda'
const main = (codec = {}) => db => {
  const {
    keyEncoding,
    valueEncoding
  } = (0, _defaultCodecs.default)(codec);
  return { ...db,
    encodingdb: true,
    put: async (key, value, options = {}) => db.put(keyEncoding.encode(key), valueEncoding.encode(value), options),
    get: async (key, options = {}) => {
      const {
        encode = true
      } = options;

      if (encode) {
        let response = await db.get(keyEncoding.encode(key), options);
        return { ...response,
          data: valueEncoding.decode(response.data)
        };
      } else {
        return db.get(keyEncoding.encode(key), options);
      }
    },
    del: (key, options = {}) => db.del(keyEncoding.encode(key), options),
    createReadStreamP: (options = {}) => (0, _conditionalQuery.default)({
      dbWithReaderP: db.createReadStreamP,
      options,
      keyEncoding,
      valueEncoding
    }),
    iteratorP: (options = {}) => (0, _conditionalQuery.default)({
      dbWithReaderP: db.iteratorP,
      options,
      keyEncoding,
      valueEncoding
    })
  };
};

var _default = main;
exports.default = _default;