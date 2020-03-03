"use strict";

const {
  spawn
} = require('child_process');

removeDatabase(); // remove()
// link()

function removeDatabase() {
  // rm dellLaptopSerials.txt
  const command = spawn('rm', ['/home/vidalii/Documents/softwareCodes/vidalii-server/packages/db/databases/mydb.sqlite']);
  command.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });
  command.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });
  command.on('close', code => {
    console.log(`child process rm_DATABASE exited with code ${code}`);
  });
}

function remove() {
  // rm dellLaptopSerials.txt
  const command = spawn('rm', ['/home/vidalii/Documents/softwareCodes/vidalii-server/ormconfig.json']);
  command.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });
  command.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });
  command.on('close', code => {
    console.log(`child process rm exited with code ${code}`);
  });
}

function link() {
  // ln -s /opt/foo /usr/bin/bar
  const command = spawn('ln', ['-s', '/home/vidalii/Documents/softwareCodes/vidalii-server/packages/db/ormconfig.json', '/home/vidalii/Documents/softwareCodes/vidalii-server']);
  command.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });
  command.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });
  command.on('close', code => {
    console.log(`child process ln exited with code ${code}`);
  });
} // const ls = spawn('ls', ['-lh', '/usr']);
// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });
//   ls.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });
//   ls.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   });
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const jwt = require('jsonwebtoken');

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }

    return null;
  } catch (err) {
    console.log('Erro jwt verification.', err);
    return null;
  }
};

var _default = ({
  req
}) => {
  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];
  const user = getUser(token);
  return {
    user
  };
};

exports.default = _default;
"use strict";

var _graphql = require("@vidalii/graphql/lib/graphql");

var _find = _interopRequireDefault(require("../../orm/crud/find"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const JSON = require('graphql-type-json').default;

const name = 'connect';
module.exports = {
  sdl: `directive @${name}(key:String model:String modelKey:String) on FIELD_DEFINITION | ARGUMENT_DEFINITION`,
  resolver: {
    [name]: class defaultNameExtended extends _graphql.SchemaDirectiveVisitor {
      visitArgumentDefinition(argument) {
        console.log('%c⧭In Argument::*******', 'color: #733d00', argument);
      }

      visitFieldDefinition(field) {
        const {
          key = null,
          model = null,
          modelKey = null
        } = this.args;
        addArgs(field);
        addResolve({
          field,
          key,
          model,
          modelKey
        });
      }

    }
  }
};

function addArgs(field) {
  field.args.push({
    name: 'filter',
    description: 'example filter:{where:{id:1,other:2}}',
    type: JSON
  });
}

function addResolve({
  field,
  key,
  model,
  modelKey
}) {
  if (model === null) resolveInField(field);else if (modelKey === null || key === null) resolveModelPreDefined({
    model,
    field
  });else resolveModelPreDefinedAndNextType({
    key,
    model,
    modelKey,
    field
  });

  function resolveInField(field) {
    field.resolve = async function (parent, args) {
      const {
        model,
        filter = {}
      } = args;
      let response = await (0, _find.default)({
        model,
        filter
      });
      return response;
    };
  }

  function resolveModelPreDefined({
    model,
    field
  }) {
    field.resolve = async function (parent, args) {
      const {
        filter = {}
      } = args;
      let response = await (0, _find.default)({
        model,
        filter
      });
      return response;
    };
  }

  function resolveModelPreDefinedAndNextType({
    key,
    model,
    modelKey,
    field
  }) {
    field.resolve = async function (parent, args) {
      const {
        filter = {}
      } = args;
      const value = parent[key];
      const refilter = { ...filter,
        where: { ...filter.where,
          [modelKey]: value
        }
      };
      let response = await (0, _find.default)({
        model,
        filter: refilter
      });
      return response;
    };
  }
}
"use strict";

var _graphql = require("graphql");

const {
  SchemaDirectiveVisitor
} = require('apollo-server-fastify');

const fs = require('fs-extra');

const name = 'createJSON';
module.exports = {
  sdl: `directive @${name}(path: String) on FIELD_DEFINITION`,
  resolver: {
    [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
      visitFieldDefinition(field) {
        const {
          path
        } = this.args;
        const blockToPath = 'uploads/' + path;
        const {
          resolve = _graphql.defaultFieldResolver
        } = field;

        field.resolve = async function (parent, args, context) {
          try {
            const {
              data
            } = args;
            fs.outputJsonSync(blockToPath, data);
            return {
              createJSON: true
            };
          } catch (error) {
            return {
              error
            };
          }
        };
      }

    }
  }
};
"use strict";

var _graphql = require("graphql");

var _insert = _interopRequireDefault(require("../../orm/crud/insert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  SchemaDirectiveVisitor
} = require('apollo-server-fastify');

const name = 'insert';
module.exports = {
  sdl: `directive @${name}(model:String) on FIELD_DEFINITION`,
  resolver: {
    [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
      visitFieldDefinition(field) {
        const {
          model = null
        } = this.args;
        if (model === null) return resolveInField(field);else return resolveModelPreDefined({
          model,
          field
        });
      }

    }
  }
};

function resolveInField(field) {
  field.resolve = async function (parent, args) {
    const {
      model,
      dataInsert
    } = args;
    let response = await (0, _insert.default)({
      model,
      dataInsert
    });
    return response;
  };
}

function resolveModelPreDefined({
  model,
  field
}) {
  field.resolve = async function (parent, args) {
    const {
      dataInsert
    } = args;
    let response = await (0, _insert.default)({
      model,
      dataInsert
    });
    return response;
  };
}
"use strict";

var _graphql = require("graphql");

const {
  SchemaDirectiveVisitor
} = require('apollo-server-fastify');

const fs = require('fs-extra');

const name = 'readJSON';
module.exports = {
  sdl: `directive @${name}(path:String cache: Boolean=false) on FIELD_DEFINITION`,
  resolver: {
    [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
      visitFieldDefinition(field) {
        const {
          path
        } = this.args;
        const blockToPath = 'uploads/' + path;
        const {
          resolve = _graphql.defaultFieldResolver
        } = field;

        field.resolve = async function () {
          try {
            const data = fs.readJsonSync(blockToPath);
            return data;
          } catch (error) {
            return {
              error
            };
          }
        };
      }

    }
  }
};
"use strict";

var _graphql = require("graphql");

var _updateById = _interopRequireDefault(require("../../orm/crud/updateById"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  SchemaDirectiveVisitor
} = require('apollo-server-fastify');

const name = 'updateById';
module.exports = {
  sdl: `directive @${name}(model:String) on FIELD_DEFINITION`,
  resolver: {
    [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
      visitFieldDefinition(field) {
        const {
          model = null
        } = this.args;
        if (model === null) return resolveInField(field);else return resolveModelPreDefined({
          model,
          field
        });
      }

    }
  }
};

function resolveInField(field) {
  field.resolve = async function (parent, args) {
    const {
      model,
      dataUpdate
    } = args;
    let response = await (0, _updateById.default)({
      model,
      dataUpdate
    });
    return response;
  };
}

function resolveModelPreDefined({
  model,
  field
}) {
  field.resolve = async function (parent, args) {
    const {
      dataUpdate
    } = args;
    let response = await (0, _updateById.default)({
      model,
      dataUpdate
    });
    return response;
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "defaultFieldResolver", {
  enumerable: true,
  get: function () {
    return _graphql.defaultFieldResolver;
  }
});
Object.defineProperty(exports, "GraphQLID", {
  enumerable: true,
  get: function () {
    return _graphql.GraphQLID;
  }
});
Object.defineProperty(exports, "GraphQLInt", {
  enumerable: true,
  get: function () {
    return _graphql.GraphQLInt;
  }
});
Object.defineProperty(exports, "GraphQLFloat", {
  enumerable: true,
  get: function () {
    return _graphql.GraphQLFloat;
  }
});
Object.defineProperty(exports, "GraphQLString", {
  enumerable: true,
  get: function () {
    return _graphql.GraphQLString;
  }
});
Object.defineProperty(exports, "GraphQLBoolean", {
  enumerable: true,
  get: function () {
    return _graphql.GraphQLBoolean;
  }
});
Object.defineProperty(exports, "gql", {
  enumerable: true,
  get: function () {
    return _apolloServerFastify.gql;
  }
});
Object.defineProperty(exports, "SchemaDirectiveVisitor", {
  enumerable: true,
  get: function () {
    return _apolloServerFastify.SchemaDirectiveVisitor;
  }
});

var _graphql = require("graphql");

var _apolloServerFastify = require("apollo-server-fastify");
"use strict";

const GraphQLJSON = require('graphql-type-json');

module.exports = {
  sdl: `scalar JSON`,
  resolver: {
    JSON: GraphQLJSON
  }
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reducerPaths = _interopRequireDefault(require("./tools/reducerPaths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ApolloServer
} = require('apollo-server-fastify');
/*
estructure of array elements: 
module.exports = {
    sdl: `scalar JSON`,
    resolver: { JSON: GraphQLJSON }
}
sdls:
must to be extend Query, and extend Mutation
*/
// scalars: [
//     fromFramework1, fromFramework2,
//     fromCustomReadPath
// ]
// { context = null, scalars = [], directives = [], sdls = [], types = [], queries = [], mutations = [] } 


var _default = (reducerOptions = {}) => {
  const {
    Scalar,
    Directive,
    Types,
    Sdl,
    Queries,
    Mutations,
    context
  } = (0, _reducerPaths.default)(reducerOptions);
  return new ApolloServer({
    typeDefs: `
        ${Scalar.sdl}
        ${Directive.sdl}
        ${Types.sdl}
        ${Sdl.sdl}
            type Query{
            ${Queries.sdl}
            hellow:String
            }
            type Mutation{
            ${Mutations.sdl}
            hellow:String
            }
        `,
    resolvers: { ...Scalar.resolver,
      ...Types.resolver,
      Query: {
        hellow: () => 'world!',
        ...Queries.resolver
      },
      Mutation: {
        hellow: () => 'world!',
        ...Mutations.resolver
      }
    },
    schemaDirectives: { ...Directive.resolver
    },
    context
  }).createHandler();
};

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localFetch = exports.createLocalFetch = void 0;

const axios = require("axios"); //created in src/server/index.js


let instance = {};

const createLocalFetch = async ({
  port
}) => {
  instance = {
    url: `http://127.0.0.1:${port}/graphql`,
    method: 'post'
  };
}; //after created can be used in wherever path in your app


exports.createLocalFetch = createLocalFetch;

const localFetch = ({
  query,
  variables = {}
}) => {
  return axios({
    url: instance.url,
    method: instance.method,
    data: {
      query,
      variables
    }
  });
}; // axios({
//     url: 'https://1jzxrj179.lp.gql.zone/graphql',
//     method: 'post',
//     data: {
//         query: `
//         query PostsForAuthor {
//           author(id: 1) {
//             firstName
//               posts {
//                 title
//                 votes
//               }
//             }
//           }
//         `
//     }
// }).then((result) => {
//     console.log(result.data)
// });


exports.localFetch = localFetch;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGraphqls = exports.loadModules = exports.loadFiles = void 0;

const glob = require("glob");

const fs = require('fs-extra');

var {
  extname
} = require('path'); //Return the extension:
// var ext = path.extname('/Users/Refsnes/demo_path.js'); == .js
// https://www.npmjs.com/package/minimatch


const loadFiles = minimatch => glob.sync(minimatch).reduce((acc, path) => {
  const realPath = fs.realpathSync(path); //path of root path of the app not of the package

  switch (extname(path)) {
    case '.js':
      const {
        sdl,
        resolver
      } = require(realPath);

      return {
        sdl: acc.sdl.concat('\n' + sdl),
        resolver: { ...acc.resolver,
          ...resolver
        }
      };

    case '.graphql':
      const str = fs.readFileSync(fs.realpathSync(path), 'utf8').toString();
      return {
        sdl: acc.sdl.concat('\n' + str),
        resolver: { ...acc.resolver
        }
      };
  }
}, {
  sdl: '',
  resolver: {}
}); ////deprected


exports.loadFiles = loadFiles;

const loadModules = path => glob.sync(path).reduce((acc, path) => {
  let {
    sdl,
    resolver
  } = require(fs.realpathSync(path));

  return {
    sdl: acc.sdl.concat('\n' + sdl),
    resolver: { ...acc.resolver,
      ...resolver
    }
  };
}, {
  sdl: '',
  resolver: {}
});

exports.loadModules = loadModules;

const loadGraphqls = path => glob.sync(path).reduce((acc, path) => {
  let str = fs.readFileSync(fs.realpathSync(path), 'utf8').toString();
  return {
    sdl: acc.sdl.concat('\n' + str),
    resolver: {}
  };
}, {
  sdl: '',
  resolver: {}
});

exports.loadGraphqls = loadGraphqls;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loadPath = require("./loadPath");

// const isCustomPath = ({ path, type }) => {
//     switch (type) {
//         case 'module':
//             return loadModules(path)
//         case 'graphql':
//             return loadGraphqls(path)
//     }
// }
// response = isCustomPath({ path: element, type })

/*
estructure of array elements: 
module.exports = {
    sdl: `scalar JSON`,
    resolver: { JSON: GraphQLJSON }
}
sdls:
must to be extend Query, and extend Mutation
*/
// scalars: [
//     fromFramework1, fromFramework2,
//     "fromCustomGlobPath"
// ]
const checkType = element => {
  switch (typeof element) {
    case 'string':
      //is a path "/dir1/dir2/*.js" get all and reduce in {sdl,resolver}
      return (0, _loadPath.loadFiles)(element);

    default:
      //is a {sdl,resolver} = obj
      return element;
  }
};

const reducer = data => data.reduce((acc, element) => {
  const {
    sdl,
    resolver
  } = checkType(element);
  return {
    sdl: acc.sdl.concat('\n', sdl),
    resolver: { ...acc.resolver,
      ...resolver
    }
  };
}, {
  sdl: '',
  resolver: {}
});

var _default = ({
  context = null,
  scalars = [],
  directives = [],
  sdls = [],
  types = [],
  queries = [],
  mutations = []
} = {}) => {
  const Scalar = reducer(scalars);
  const Directive = reducer(directives); // const Sdl = reducer(sdls, 'graphql')

  const Sdl = reducer(sdls);
  const Types = reducer(types);
  const Queries = reducer(queries);
  const Mutations = reducer(mutations);
  return {
    Scalar,
    Directive,
    Sdl,
    Types,
    Queries,
    Mutations
  };
};

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directives = exports.scalars = void 0;

var _loadPath = require("./graphql/service/tools/loadPath");

const fs = require('fs-extra');

console.log('In @vidalii/framework');

const scalars = () => (0, _loadPath.loadModules)(__dirname + '/graphql/scalars/*.js');

exports.scalars = scalars;

const directives = () => (0, _loadPath.loadModules)(__dirname + '/graphql/directives/*.js');

exports.directives = directives;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFilters = void 0;

var _typeorm = require("typeorm");

const Filters = {
  Not: _typeorm.Not,
  lessthan: _typeorm.LessThan,
  Lesstanorequal: _typeorm.LessThanOrEqual,
  Morethan: _typeorm.MoreThan,
  Morethanorequal: _typeorm.MoreThanOrEqual,
  Equal: _typeorm.Equal,
  Like: _typeorm.Like,
  Between: _typeorm.Between,
  In: _typeorm.In,
  Any: _typeorm.Any,
  IsNull: _typeorm.IsNull
};

const stadarizedName = name => {
  name = name.slice(1).toLowerCase();
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const applyFilters = ({
  filter
}) => {
  let key;

  for (key in filter) {
    let value = filter[key];

    if (Array.isArray(value)) {
      if (typeof value[0] === 'object') {
        //is a where[] OR
        for (let index = 0; index < value.length; index++) {
          applyFilters({
            filter: value[index]
          });
        }
      } else if (value[0].charAt(0) === '$') {
        let FilterName = stadarizedName(value[0]);

        if (value[1].charAt(0) === '$') {
          let FilterName2 = stadarizedName(value[1]);
          filter[key] = Filters[FilterName](Filters[FilterName2](value[2]));
        } else filter[key] = Filters[FilterName](value[1]);
      }
    } else if (typeof value === 'object') applyFilters({
      filter: value
    });
  }
};

exports.applyFilters = applyFilters;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _applyFilters = require("./applyFilters");

var _default = async ({
  connection = 'default',
  model,
  filter
}) => {
  (0, _applyFilters.applyFilters)({
    filter
  }); // console.log('%cfilter2:', 'color: #917399', filter);
  // console.log(typeof filter)

  filter = JSON.stringify(filter); // console.log('%cNewOne::', 'color: #ffa640', newOne);

  filter = JSON.parse(filter); // https://typeorm.io/#/find-options
  // let getsql = await getConnection(connectionName)
  //     .getRepository(schemaName)
  //     .find({_id:0})
  // console.log('getsql::', getsql)
  // let hola = { where: { id: 2 } }
  // console.log('%cHola:', 'color: #00b300', hola);

  let response = await (0, _typeorm.getConnection)(connection).getRepository(model) // .find(filter)
  .find(filter); // .find({ ...filter })
  // .find({ where: { id: 2 } })
  // .find(hola)
  // console.log('%cResponse', 'color: #d90000', response);

  return response;
};

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async ({
  connection = 'default',
  model,
  dataInsert
}) => {
  //dataInsert [] for many or {} for one
  // let response = await getConnection(connection)
  //     .createQueryBuilder()
  //     .insert()
  //     .into(model)
  //     .values(dataInsert)
  //     .execute()
  try {
    let rows = Array.isArray(dataInsert) ? dataInsert : [dataInsert];
    let promises = [];
    await (0, _typeorm.getConnection)(connection).transaction(async transactionalEntityManager => {
      while (rows.length) {
        promises.push(transactionalEntityManager.createQueryBuilder().insert().into(model) // .values(dataInsert.splice(0, 999))
        .values(rows.splice(0, 499)).execute());
      }
    });
    let response = await Promise.all(promises);
    return {
      inserted: true
    };
  } catch (error) {
    throw new Error(error);
  } // let sqlquery = await getConnection(connectionName)
  //     .createQueryBuilder()
  //     .insert()
  //     .into(schemaName)
  //     .values(dataInsert)
  //     .getSql()
  // let sqlquery = await getConnection(connectionName)
  //     .createQueryBuilder()
  //     .update(schemaName)
  //     .set({ name: 'hellow' })
  //     // .where("id = :id", { _id: 1 })
  //     .where({ _id: 1 ,name:'2'})
  //     .getSql()
  // console.log('sqlquery::', sqlquery)    

};

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async ({
  connection = 'default',
  model,
  dataUpdate
}) => {
  try {
    let rows = Array.isArray(dataUpdate) ? dataUpdate : [dataUpdate];
    let promises = [];
    await (0, _typeorm.getConnection)(connection).transaction(async transactionalEntityManager => {
      for (let index = 0; index < rows.length; index++) {
        const {
          id,
          ...others
        } = rows[index];
        promises.push(transactionalEntityManager.createQueryBuilder().update(model).set(others).where("id = :id", {
          id
        }).execute());
      }
    });
    let response = await Promise.all(promises); // return always
    // {
    //     "dataUpdate": {
    //       "updateById": [
    //         {
    //           "generatedMaps": [],
    //           "raw": []
    //         }
    //       ]
    //     }
    //   }

    return {
      update: true
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "EntitySchema", {
  enumerable: true,
  get: function () {
    return _typeorm.EntitySchema;
  }
});

var _typeorm = require("typeorm");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createConnection", {
  enumerable: true,
  get: function () {
    return _typeorm.createConnection;
  }
});

var _typeorm = require("typeorm");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "EntitySchema", {
  enumerable: true,
  get: function () {
    return _typeorm.EntitySchema;
  }
});
Object.defineProperty(exports, "createConnection", {
  enumerable: true,
  get: function () {
    return _typeorm.createConnection;
  }
});

var _typeorm = require("typeorm");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;
// import { EntitySchema } from "@vidalii/orm/lib/EntitySchema";
const server = {
  name: "server",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    id_site: {
      type: "int"
    },
    alias: {
      type: "varchar",
      length: 150
    },
    dns: {
      type: "varchar",
      length: 253
    },
    ipv4: {
      type: "varchar",
      length: 11
    }
  }
}; // export const entityServer = new EntitySchema(schemaServer);

exports.server = server;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async config => {
  try {
    const connection = await (0, _typeorm.createConnection)(config);
    console.log(`The connection "${connection.name}" was created`);
  } catch (error) {
    console.log('Error:', error);
  }
};

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// example plugin:
// async function route(fastify, options) {
//     fastify.get('/hello', async (request, reply) => {
//         return { hello: 'world' }
//     })
// }
//startService({
//     plugins:[
//         [serviceGql.createHandler()],//graphql
//         [require('fastify-cors'),{}],
//     ]
// })
const startService = async ({
  plugins = [],
  port = 3000
} = {}) => {
  try {
    const fastify = require('fastify')();

    for (let index = 0; index < plugins.length; index++) {
      if (Array.isArray(plugins[index])) fastify.register(...plugins[index]);else fastify.register(plugins[index]);
    } // fastify.register(serviceGql.createHandler());
    // fastify.register(require('fastify-cors'), {
    // })


    await fastify.listen(port); // fastify.log.info(`server listening on ${fastify.server.address().port}`)

    console.log(`server listening on ${JSON.stringify(fastify.server.address())}`); // process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });

    return {
      error: null,
      service: fastify.server.address()
    };
  } catch (error) {
    // fastify.log.error(err)
    console.log('Error:', error); // process.exit(1)
  }
};

var _default = startService;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startServices;

var _fastify = _interopRequireDefault(require("./fastify"));

var _apollo = _interopRequireDefault(require("../graphql/service/apollo.fastify"));

var _startConnection = _interopRequireDefault(require("../orm/service/startConnection"));

var _fetch = require("../graphql/service/fetch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//**server**
//**graphql**
//**orm**
//**fetch**
// const { scalars, directives, types, queries, mutations, sdls, context } = gqlConfig
async function startServices({
  ormConfig,
  port,
  gqlConfig
}) {
  await (0, _startConnection.default)(ormConfig);
  await (0, _fetch.createLocalFetch)({
    port
  });
  await (0, _fastify.default)({
    port,
    plugins: [(0, _apollo.default)(gqlConfig)]
  });
}
