const startServer = require('./startServers')
const models = require('./models')
const types = require('../toPackage/valuesTypes')
const validator = require('../toPackage/validatorSchema')
const schemas = require('../toPackage/vidaliiDB')
const myschemas = schemas({})
// var s = "0"
// console.log('String::', Boolean(s))
myschemas.loadSchema({
    name: 'schema2',
    schemaValidator: {
        a: () => 1
    }
})

startServer()