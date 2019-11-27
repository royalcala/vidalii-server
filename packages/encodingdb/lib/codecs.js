"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.json = exports.utf8 = void 0;
const utf8 = {
  keyEncoding: {
    encode: String,
    decode: buff => {
      var toDecode = buff.toString('utf8');
      return toDecode;
    }
  },
  valueEncoding: {
    encode: String,
    decode: buff => {
      var toDecode = buff.toString('utf8');
      return toDecode;
    }
  }
};
exports.utf8 = utf8;
const json = {
  //BOTH CASES WORKS
  //CASE1
  // encode: objectJson => Buffer.from(JSON.stringify(objectJson)),       
  // decode: buf => JSON.parse(buf.toString())
  //CASE2
  keyEncoding: {
    encode: JSON.stringify,
    decode: JSON.parse
  },
  valueEncoding: {
    encode: JSON.stringify,
    decode: JSON.parse
  }
};
exports.json = json;