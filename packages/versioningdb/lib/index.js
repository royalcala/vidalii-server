"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _subdb = _interopRequireDefault(require("@vidalii/subdb"));

var _encodingdb = _interopRequireDefault(require("@vidalii/encodingdb"));

var _codecs = require("@vidalii/encodingdb/lib/codecs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createFragments = ({
  db
}) => {
  const rev = (0, _pipe2.default)((0, _subdb.default)({
    prefix: 'rev'
  }), (0, _encodingdb.default)({
    valueEncoding: _codecs.json.valueEncoding
  }))(db);
  const seq = (0, _pipe2.default)((0, _subdb.default)({
    prefix: 'seq'
  }), (0, _encodingdb.default)({
    valueEncoding: _codecs.json.valueEncoding
  }))(db);
  const doc = (0, _pipe2.default)((0, _subdb.default)({
    prefix: 'doc'
  }), (0, _encodingdb.default)({
    valueEncoding: _codecs.json.valueEncoding
  }))(db);
  return {
    rev,
    seq,
    doc
  };
};

const main = ({
  maxVersions = 5
}) => db => {
  const {
    rev,
    seq,
    doc
  } = createFragments({
    db
  }); //get sublevels here

  return { ...db,
    insertOne: (key, value) => {//if key has only _id that means to insert a new one
      //->check if exist, if exist send error
      //if key has rev
      //->check if is the last rev for proceed
    },
    updateOne: (key, value) => {}
  }; // const { keyEncoding, valueEncoding } = getDefaultsCodecs(codec)
  // return {
  //     ...db,
  //     put: (key, value, options = {}) => db.put(
  //         keyEncoding.encode(key),
  //         valueEncoding.encode(value),
  //         options),
  //     get: async (key, options = {}) => {
  //         const { encode = true } = options
  //         if (encode) {
  //             let response = await db.get(
  //                 keyEncoding.encode(key),
  //                 options
  //             )
  //             return {
  //                 ...response,
  //                 data: valueEncoding.decode(response.data)
  //             }
  //         }
  //         else {
  //             return db.get(
  //                 keyEncoding.encode(key),
  //                 options
  //             )
  //         }
  //     },
  //     del: (key, options = {}) => db.del(
  //         keyEncoding.encode(key),
  //         options
  //     ),
  //     createReadStreamP: (options = {}) => conditionalQuery({
  //         dbWithReaderP: db.createReadStreamP,
  //         options,
  //         keyEncoding,
  //         valueEncoding
  //     }),
  //     iteratorP: (options = {}) => conditionalQuery({
  //         dbWithReaderP: db.iteratorP,
  //         options,
  //         keyEncoding,
  //         valueEncoding
  //     })
  // }
};

var _default = main;
exports.default = _default;