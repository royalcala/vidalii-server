"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cond2 = _interopRequireDefault(require("ramda/src/cond"));

var _mergeDeepRight2 = _interopRequireDefault(require("ramda/src/mergeDeepRight"));

var _propEq2 = _interopRequireDefault(require("ramda/src/propEq"));

var _allPass2 = _interopRequireDefault(require("ramda/src/allPass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const condBoth = [({
  options
}) => (0, _allPass2.default)([(0, _propEq2.default)('keys', true), (0, _propEq2.default)('values', true)])(options), async ({
  iterator,
  onData,
  endCallback,
  decodeOut,
  encoder
}) => {
  const next = iterator => new Promise((resolve, reject) => {
    iterator.next((error, key, value) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        // if (key === undefined || decodeOut === false) {
        resolve({
          key,
          value
        }); // } else {
        //     resolve({
        //         key: encoder.keyEncoding.decode(key),
        //         value: encoder.valueEncoding.decode(value)
        //     })
        // }
      }
    });
  }); // for (var i = 0; i < howMany; i++) {


  while (true) {
    try {
      var result = await next(iterator);

      if (result.key === undefined || onData(result)) {
        iterator.end(endCallback);
        break;
      }
    } catch (error) {
      // console.log('error::', error)
      iterator.end(endCallback);
      break;
    }
  }
}];
const condOnlyKeys = [({
  options
}) => (0, _allPass2.default)([(0, _propEq2.default)('keys', true), (0, _propEq2.default)('values', false)])(options), async ({
  iterator,
  onData,
  endCallback,
  decodeOut,
  encoder
}) => {
  const next = iterator => new Promise((resolve, reject) => {
    iterator.next((error, key, value) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        //     if (key === undefined || decodeOut === false) {
        resolve(key); // } else {
        //     resolve(encoder.keyEncoding.decode(key))
        // }
      }
    });
  }); // for (var i = 0; i < howMany; i++) {


  while (true) {
    var key = await next(iterator);

    if (key === undefined || onData(key)) {
      iterator.end(endCallback);
      break;
    }
  }
}];
const condOnlyValues = [({
  options
}) => (0, _allPass2.default)([(0, _propEq2.default)('keys', false), (0, _propEq2.default)('values', true)])(options), async ({
  iterator,
  onData,
  endCallback,
  decodeOut,
  encoder
}) => {
  const next = iterator => new Promise((resolve, reject) => {
    iterator.next((error, key, value) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        //     if (value === undefined || decodeOut === false) {
        resolve(value); // } else {
        //     resolve(encoder.valueEncoding.decode(value))
        // }
      }
    });
  }); // for (var i = 0; i < howMany; i++) {


  while (true) {
    var value = await next(iterator);

    if (value === undefined || onData(value)) {
      iterator.end(endCallback);
      break;
    }
  }
}];

const initDefaultoptions = ({
  options
}) => {
  var defaults = {
    onData: () => {},
    keys: true,
    values: true // reverse: false,
    // limit: -1,
    // keyAsBuffer: true,
    // valueAsBuffer: true,

  };
  return (0, _mergeDeepRight2.default)(defaults, options);
};

var _default = (db, options = {}) => {
  var defaultoptions = initDefaultoptions({
    options
  });
  return (0, _cond2.default)([condBoth, condOnlyKeys, condOnlyValues])({
    options: { ...defaultoptions
    },
    // encoder: db[nameDB].encoder,
    iterator: db.iterator(defaultoptions),
    onData: defaultoptions.onData,
    // decodeOut: defaultoptions.decodeOut,
    endCallback: e => {
      if (e) console.log('Error ending iterator::', e);
    }
  });
};

exports.default = _default;