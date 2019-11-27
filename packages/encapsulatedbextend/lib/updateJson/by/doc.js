"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeDeepRight2 = _interopRequireDefault(require("ramda/src/mergeDeepRight"));

var _mergeDeepWithKey2 = _interopRequireDefault(require("ramda/src/mergeDeepWithKey"));

var _cond2 = _interopRequireDefault(require("ramda/src/cond"));

var _type2 = _interopRequireDefault(require("ramda/src/type"));

var _equals2 = _interopRequireDefault(require("ramda/src/equals"));

var fp = _interopRequireWildcard(require("../fpFxs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const typeOf2doArg = data => equalsTo => pipe(nthArg(1), type, equals(equalsTo))(data)
const isIt = (k, l, r) => nameOfType => (0, _equals2.default)((0, _type2.default)(l), nameOfType);

const conditionalValue = actions => (0, _cond2.default)([[isIt('Array'), actions.valueIsArray], [isIt('Number'), actions.valueIsString], [isIt('String'), actions.valueIsString]]);

const updateJson = async ({
  key,
  db,
  prevDoc,
  newDoc,
  actions
}) => {
  let newObject = await (0, _mergeDeepWithKey2.default)(conditionalValue(actions), prevDoc, newDoc);
  let response = db.put(kye, newObject);
  return newObject;
};

const initDefaultActions = ({
  actions
}) => {
  var defaults = {
    valueIsArray: fp.concat,
    valueIsString: (k, prev, n) => n,
    valueIsNumber: (k, prev, n) => n
  };
  return (0, _mergeDeepRight2.default)(defaults, actions);
};

const main = ({
  db,
  getOne
}) => async (key, value, {
  actions = {}
}) => {
  actions = initDefaultActions({
    actions
  });
  let prevDoc = await getOne(key);
  return ifElse(() => prevDoc.error === null, updateJson, () => ({
    error: {
      msg: `The key ${key}already exist. Please select other key`
    }
  }))({
    key,
    db,
    prevDoc,
    newDoc: value,
    actions
  });
};

var _default = main;
exports.default = _default;