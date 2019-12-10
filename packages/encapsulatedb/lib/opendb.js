"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const close = (db, options = {}) => new Promise((resolve, reject) => {
  db.close(err => {
    if (err) reject(err);else resolve(true);
  });
});

const open = (db, options = {}) => new Promise((resolve, reject) => {
  db.open(options, err => {
    if (err) reject(err);else resolve(db);
  });
});

const tryOpenDB = async db => {
  let response;

  try {
    response = await open(db);
    return {
      db: response,
      error: null
    };
  } catch (error) {
    try {
      response = await close(db);

      try {
        response = await open(db);
        return {
          db: response,
          error: null
        };
      } catch (error) {
        return {
          error
        };
      }
    } catch (error) {
      return {
        error
      };
    }
  }
};

const timer = ms => new Promise(res => setTimeout(res, ms));

const main = async db => {
  let opened_db;

  while (true) {
    opened_db = await tryOpenDB(db);

    if (opened_db.error !== null) {
      console.log('Trying to open the database.');
      await timer(2000);
    } else break;
  }

  console.log('Database was Opened.');
  return opened_db.db;
};

var _default = main;
exports.default = _default;