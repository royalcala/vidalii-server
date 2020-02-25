import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
import find from "#/src/orm/crud/find";
const name = 'insert'
module.exports = {
    sdl: `directive @${name} on FIELD_DEFINITION`,
    resolver: {
        [name]: class insert extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function (parent, args, context) {
                    const { model, filter = {} } = args

                    let response = await find({ model, filter })
                    console.log('%c⧭', 'color: #733d00', response);
                    return response
                };
            }
        }
    }
}