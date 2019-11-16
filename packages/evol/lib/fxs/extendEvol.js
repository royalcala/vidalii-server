"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curryTopWithObject = exports.curryTopWithFxs = exports.returnValueTop = exports.returnChildren = exports.returnAll = void 0;

var _evolCompose = _interopRequireDefault(require("./evolCompose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const returnAll = (...branchs) => (initialParents = {}) => (0, _evolCompose.default)(...branchs)(a => a)(initialParents);

exports.returnAll = returnAll;

const returnChildren = (...branchs) => (initialParents = {}) => (0, _evolCompose.default)(...branchs)(allObjects => omit(keys(initialParents), allObjects))(initialParents);

exports.returnChildren = returnChildren;

const returnValueTop = (...branchs) => (initialParents = {}) => {
  var nameTop = branchs[0][0];
  return (0, _evolCompose.default)(...branchs)(allObjects => allObjects[nameTop])(initialParents);
};

exports.returnValueTop = returnValueTop;

const curryTopWithFxs = (top, ...otherFxs) => initData => {
  const curryTop = curry(top);
  const wrapOthers = map(fx => {
    return fxCurry => fxCurry(fx);
  })(otherFxs);
  return pipe(init => curryTop(init), ...wrapOthers)(initData);
};

exports.curryTopWithFxs = curryTopWithFxs;

const curryTopWithObject = (top, objOfFxs) => initData => {
  return top(initData, objOfFxs);
}; //example
//   const tableFinal = evolComposeReturnChildren(
//     ['table', () => ({
//       //One
//       insertOne: '',
//       updateOne: '',
//       getOne: '',
//       findOne: ''
//       //Many
//     })],
//     ['models', evolComposeReturnChildren(
//       ['docs', () => 'data2.1'],
//       ['seq', () => 'data2.1'],
//       ['rev', ({ tools, db }) => {
//         var myCustomEncoder = {}
//         // var encoder = tools.encoder(myCustomEncoder)
//         return {
//           insertOne: {
//           }
//         }
//       }],
//       ['modelsExtend', evolComposeReturnChildren(
//         ['querySream', () => ({ db, defEncoder }) =>
//           (options) =>
//             evolComposeReturnTop(
//               ['finalFx', ({ }) => 'processData'],
//               ['defaultOptions', () => {
//                 ///transforme schema
//                 // {
//                 //   query = {},
//                 //   withEncoder = true,
//                 //   onData = () => { },
//                 //   onError = () => { },
//                 //   onClose = () => { },
//                 //   onEnd = () => { }
//                 // }
//                 //query Merge options
//                 //withEncoder->table'true-true'->functionEncoder
//               }]
//             )],
//         ['encoder', () => (myCustomEncoder) => 'encoderScript']
//       )
//       ]
//     )
//     ],
//     ['db',
//       evolComposeReturnTop(
//         ['db_levelup', ({ db }) => db],
//         //in memory
//         //in leveldown
//         //in browser
//         ['db',
//           ({ config }) => compose(
//             reduce(__, {}, toPairs(config.tables)),
//             condition => (acc, [tableName, tableConfig]) => assoc(
//               tableName,
//               condition({ tableName, tableConfig }),
//               acc
//             ),
//             cond
//           )([
//             typedb_inStorage,
//             typedb_inMemory
//           ])
//         ]
//       )
//     ],
//   )({
//     config: configTable,
//     standarizedResponse
//   })


exports.curryTopWithObject = curryTopWithObject;