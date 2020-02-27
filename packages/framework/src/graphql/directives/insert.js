import { defaultFieldResolver } from "graphql";
import insert from "../../orm/crud/insert";
// import insert from "#/src/orm/crud/insert";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const name = 'insert'
module.exports = {
    sdl: `directive @${name} on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function (parent, args, context) {
                    const { model, data } = args
                    let response = await insert({ model, data })
                    return response
                };
            }
        }
    }
}