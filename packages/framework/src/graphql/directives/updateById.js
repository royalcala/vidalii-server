import { defaultFieldResolver } from "graphql";
import updateById from "../../orm/crud/updateById";
// import updateById from "#/src/orm/crud/updateById";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const name = 'updateById'
module.exports = {
    sdl: `directive @${name} on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function (parent, args, context) {
                    const { model, data } = args
                    let response = await updateById({ model, data })
                    return response
                };
            }
        }
    }
}