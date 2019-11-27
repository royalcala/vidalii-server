"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assoc2 = _interopRequireDefault(require("ramda/src/assoc"));

var _reduce2 = _interopRequireDefault(require("ramda/src/reduce"));

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var updateJsonBy = _interopRequireWildcard(require("./updateJson"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const lockKeys = () => {
//     let lockedKeysStore = {}
//     return {
//         lock: key => { lockedKeysStore[key] = true },
//         unlock: key => { delete lockedKeysStore[key] }
//     }
// }
const getOne = ({
  db
}) => key => db.get(key);

const existDoc = ({
  getOne
}) => async key => {
  let response = await getOne(key);
  if (response.error === null) return false;else return true;
};

const replaceOne = ({
  db
}) => (key, value) => db.put(key, value);

const insertOne = ({
  replaceOne,
  existDoc
}) => async (key, value) => {
  let exist = await existDoc;
  return (0, _ifElse2.default)(() => exist === false, () => ({
    error: {
      msg: `The key ${key}already exist. Please select other key`
    }
  }), () => replaceOne(key, value))();
};

const main = db => {
  let result = (0, _reduce2.default)((acc, [name, fx]) => (0, _assoc2.default)(name, fx(acc), acc), {
    db
  })([// ['lockKeys', lockKeys],
  ['getOne', getOne], ['existDoc', existDoc], ['replaceOne', replaceOne], ['insertOne', insertOne], ['updateJsonByDoc', updateJsonBy.doc]]);
  delete result.db;
  return result;
};

var _default = main;
exports.default = _default;