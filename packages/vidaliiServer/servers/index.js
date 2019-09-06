const startServer = require('./startServers')
// const models = require('./models')
// const R = require('ramda')
// console.log(
//     'models.models()::',
//     models.printModels(),
//     'models.schemas()',
//     models.printSchemas(),
//     ':::::::::::::smodels.printGraphql()::::::::::',
//     models.printGraphql()
// )

// const fs = require('fs');
// const { types, queries, resolvers } = models.printGraphql()

// // console.log('resolvers.queries::',resolvers.queries)
// const content = R.pipe(
//     R.toPairs,
//     R.reduce((acc, [nameType, sdl]) => R.concat(acc, sdl + '\n'), '')
// )(types)

// fs.writeFileSync(__dirname + '/autoTypeDefs.graphql', content + '\n' + queries)

// var toString = Object.prototype.toString;

// function dump_object(obj) {
//     var buff, prop;
//     buff = [];
//     for (prop in obj) {
//         buff.push(dump_to_string(prop) + ': ' + dump_to_string(obj[prop]))
//     }
//     return '{' + buff.join(', ') + '}';
// }

// function dump_array(arr) {
//     var buff, i, len;
//     buff = [];
//     for (i = 0, len = arr.length; i < len; i++) {
//         buff.push(dump_to_string(arr[i]));
//     }
//     return '[' + buff.join(', ') + ']';
// }

// function dump_to_string(obj) {
//     if (toString.call(obj) == '[object Function]') {
//         return obj.toString();
//     } else if (toString.call(obj) == '[object Array]') {
//         return dump_array(obj);
//     } else if (toString.call(obj) == '[object String]') {
//         return '"' + obj.replace('"', '\\"') + '"';
//     } else if (obj === Object(obj)) {
//         return dump_object(obj);
//     }
//     return obj.toString();
// }

// fs.writeFileSync(__dirname + '/resolvers/Query.js', 'module.exports=\n' + dump_to_string(resolvers.Query))
// const hola = ({ ...data }) => {
//     data.link.a2 = 'nuevo'
//     data.test.yes = 'yes'
// }

// var test = {}


// var arreglo = [1, 2, 3]

// arreglo.map(
//     x => {
//         test[x] = { a: x }
//         hola({ test, link: test[x] })
//     }
// )

// console.log(
//     'test::',
//     test
// )

startServer()