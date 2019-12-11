"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _opendb = _interopRequireDefault(require("./opendb"));

var _iteratorP = _interopRequireDefault(require("./iteratorP"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Readable = require('stream').Readable;

const main = async ({
  location,
  options = {},
  store
}) => {
  let db = await (0, _opendb.default)(store(location, options)); // console.log('db::', db)

  return {
    close: () => new Promise((resolve, reject) => {
      console.log('closing database...');
      db.close(err => {
        if (err) {
          console.log('Something happend closing the database:' + err);
          reject(err);
        } else {
          console.log('the database was closed');
          resolve(true);
        }
      });
    }),
    put: (key, value, options = {}) => new Promise((resolve, reject) => {
      db.put(key, value, options, error => {
        if (error) reject({
          error
        });else resolve({
          error: null
        });
      });
    }),
    get: (key, options = {}) => new Promise((resolve, reject) => {
      db.get(key, options, (error, data) => {
        if (error) reject({
          error
        });else resolve({
          error: null,
          data
        });
      });
    }),
    del: (key, options = {}) => new Promise((resolve, reject) => {
      db.del(key, options, error => {
        if (error) reject({
          error
        });else resolve({
          error: null
        });
      });
    }),
    batch: (ops, options = {}) => new Promise((resolve, reject) => {
      // var ops = [
      //     { type: 'del', key: 'father' },
      //     { type: 'put', key: 'name', value: 'Yuri Irsenovich Kim' },
      //     { type: 'put', key: 'dob', value: '16 February 1941' },
      //     { type: 'put', key: 'spouse', value: 'Kim Young-sook' },
      //     { type: 'put', key: 'occupation', value: 'Clown' }
      // ]
      db.batch(ops, options, error => {
        if (error) reject({
          error
        });else resolve({
          error: null
        });
      });
    }),
    createReadStreamP: ({
      onData = () => {},
      ...options
    }) => new Promise((resolve, reject) => {// const stream = new Readable({
      //     objectMode: true,
      //     read() {}
      //   })
      // db.createReadStream(options)
      //     .on('data', onData)
      //     .on('error', function (err) {
      //         reject(err)
      //     })
      //     .on('close', function () {
      //         resolve('Stream closed')
      //     })
      //     .on('end', function () {
      //         resolve('Stream ended')
      //     })
    }),
    iteratorP: (options = {}) => (0, _iteratorP.default)(db, options),
    encapsulatedb: true
  };
}; // const main = db => {
//     return {
//         put: (key, value, options = {}) => new Promise((resolve, reject) => {
//             db.put(key, value, options, error => {
//                 if (error)
//                     reject({ error })
//                 else
//                     resolve({ error: null })
//             })
//         }),
//         get: (key, options = {}) => new Promise((resolve, reject) => {
//             db.get(key, options, (error, data) => {
//                 if (error)
//                     reject({ error })
//                 else
//                     resolve({ error: null, data })
//             })
//         }),
//         del: (key, options = {}) => new Promise((resolve, reject) => {
//             db.del(key, options, (error) => {
//                 if (error)
//                     reject({ error })
//                 else
//                     resolve({ error: null })
//             })
//         }),
//         createReadStreamP: ({ onData = () => { }, ...options }) => new Promise(
//             (resolve, reject) => {
//                 db.createReadStream(options)
//                     .on('data', onData)
//                     .on('error', function (err) {
//                         reject(err)
//                     })
//                     .on('close', function () {
//                         resolve('Stream closed')
//                     })
//                     .on('end', function () {
//                         resolve('Stream ended')
//                     })
//             }),
//         iteratorP: (options = {}) => iteratorP(db, options),
//         encapsulatedb: true
//     }
// }


var _default = main;
exports.default = _default;