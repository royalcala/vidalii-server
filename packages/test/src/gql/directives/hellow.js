import { defaultFieldResolver } from "@vidalii/framework/src/graphql/lib/defaultFieldResolver";
import { SchemaDirectiveVisitor } from "@vidalii/framework/src/graphql/lib/SchemaDirectiveVisitor";
// import { defaultFieldResolver } from "graphql";
// const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const name = 'hellow'
module.exports = {
    sdl: `directive @${name}(path:String cache: Boolean=false) on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function () {
                    return 'Hellow World! from directive @hellow'
                };
            }
        }
    }
}