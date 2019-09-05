const startServer = require('./startServers')
const models = require('./models')
const R = require('ramda')
console.log(
    // 'models.models()::',
    // models.printModels(),
    'models.schemas()',
    models.printSchemas(),
    ':::::::::::::smodels.printGraphql()::::::::::',
    models.printGraphql()
)

const fs = require('fs');
const content = R.pipe(
    R.toPairs,
    R.reduce((acc, [nameType, sdl]) => R.concat(acc, sdl + '\n'), '')
)(models.printGraphql().storeTypes)

fs.writeFileSync(__dirname + '/autoTypeDefs.graphql', content + '\n' + models.printGraphql().storeQueries)

const test = () => 'hola'

fs.writeFileSync(__dirname + '/object.js', test)
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

// startServer()