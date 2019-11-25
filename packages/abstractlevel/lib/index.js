"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _iteratorP = _interopRequireDefault(require("./iteratorP"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log('in abstractionlevel')
// const leveldown = require('leveldown')
// const levelup = require('levelup')
const main = db => {
  return {
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
    createReadStreamP: ({
      onData = () => {},
      ...options
    }) => new Promise((resolve, reject) => {
      db.createReadStream(options).on('data', onData).on('error', function (err) {
        reject(err);
        console.log('Oh my!', err);
      }).on('close', function () {
        resolve();
        console.log('Stream closed');
      }).on('end', function () {
        console.log('Stream ended');
      });
    }),
    iteratorP: (options = {}) => (0, _iteratorP.default)(db, options)
  };
};

var _default = main;
exports.default = _default;