"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curryTopWithObject = exports.curryTopWithFxs = exports.evolComposeReturnTop = exports.evolComposeReturnChildren = exports.evolComposeReturnAll = void 0;

const evolComposeReturnAll = (...branchs) => (initialParents = {}) => evolCompose(...branchs)(a => a)(initialParents);

exports.evolComposeReturnAll = evolComposeReturnAll;

const evolComposeReturnChildren = (...branchs) => (initialParents = {}) => evolCompose(...branchs)(allObjects => omit(keys(initialParents), allObjects))(initialParents);

exports.evolComposeReturnChildren = evolComposeReturnChildren;

const evolComposeReturnTop = (...branchs) => (initialParents = {}) => {
  var nameTop = branchs[0][0];
  return evolCompose(...branchs)(allObjects => allObjects[nameTop])(initialParents);
};

exports.evolComposeReturnTop = evolComposeReturnTop;

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