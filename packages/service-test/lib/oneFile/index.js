"use strict";

var _server = _interopRequireDefault(require("@vidalii/framework/src/server"));

var _jwt = _interopRequireDefault(require("@vidalii/framework/src/graphql/context/jwt"));

var _src = require("@vidalii/framework/src");

var _config = _interopRequireDefault(require("./orm/config.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//the imports require babel package module-resolver  and alias of "@vidalii": "@vidalii/framework/src/"
//server 
//graphql
//orm
startServices();

async function startServices() {
  await (0, _server.default)({
    ormConfig: _config.default,
    port: process.env.SERVER_PORT,
    gqlConfig: {
      scalars: [(0, _src.scalars)()],
      directives: [(0, _src.directives)(), "src/gql/directives/*.js"],
      // types: ["src/gql/types/*.js"],
      // queries: ["src/gql/queries/*.js"],
      // mutations: ["src/gql/mutations/*.js"],
      sdls: ["src/gql/sdls/*.graphql", "src/gql/sdls/*.js"],
      context: _jwt.default
    }
  });
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExampleModel = void 0;

var _EntitySchema = require("@vidalii/framework/src/orm/lib/EntitySchema");

const ExampleModel = new _EntitySchema.EntitySchema({
  name: "example",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    }
  }
});
exports.ExampleModel = ExampleModel;
