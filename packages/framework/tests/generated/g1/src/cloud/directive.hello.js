import { SchemaDirectiveVisitor } from 'npm.graphql2'
const JSON = require('npm.requireeModulee********************')
import find from "lib.crud.find";

module.exports = {
    name: 'hello',
    args: '(state:String)',
    defs: ['FIELD_DEFINITION'],
    resolver: {
        visitFieldDefinition: function (field) {
            return 'hello world!'
        }
    },
    init: (sdl = '', directives = []) => {
        //create connections and entities here
        //config file
        //query download model="name" @vidalii/lib.classification.name
        //helper for build lib.classification
        //before used in files search the file and copy on proyect/cloud


    },
    transpiler: (sdl = '', directive = []) => {
        //fetch from cloud libraries query directive
        //vidalii install name
    },
    // packages: [''] install with babel 
}