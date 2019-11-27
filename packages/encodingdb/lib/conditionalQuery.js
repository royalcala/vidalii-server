"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _allPass2 = _interopRequireDefault(require("ramda/src/allPass"));

var _cond2 = _interopRequireDefault(require("ramda/src/cond"));

var _propEq2 = _interopRequireDefault(require("ramda/src/propEq"));

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _mergeWithDefaultOptions = _interopRequireDefault(require("./mergeWithDefaultOptions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conditionalQuery = ({
  dbWithReaderP,
  options,
  keyEncoding,
  valueEncoding
}) => {
  let mergedOptions = (0, _mergeWithDefaultOptions.default)({
    options,
    keyEncoding
  });
  return (0, _ifElse2.default)((0, _propEq2.default)('encode', true), (0, _cond2.default)([[(0, _allPass2.default)([(0, _propEq2.default)('keys', true), (0, _propEq2.default)('values', true)]), merOpt => dbWithReaderP({ ...merOpt,
    onData: data => merOpt.onData({
      key: keyEncoding.decode(data.key),
      value: valueEncoding.decode(data.value)
    })
  })], [(0, _allPass2.default)([(0, _propEq2.default)('keys', true), (0, _propEq2.default)('values', false)]), merOpt => dbWithReaderP({ ...merOpt,
    onData: data => merOpt.onData(keyEncoding.decode(data))
  })], [(0, _allPass2.default)([(0, _propEq2.default)('keys', false), (0, _propEq2.default)('values', true)]), merOpt => dbWithReaderP({ ...merOpt,
    onData: data => merOpt.onData(valueEncoding.decode(data))
  })]]), merOpt => dbWithReaderP(merOpt))(mergedOptions);
};

var _default = conditionalQuery;
exports.default = _default;