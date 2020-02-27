import { defaultFieldResolver } from "graphql";
import find from "../../orm/crud/find";
// import find from "#/src/orm/crud/find";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const name = 'find'
module.exports = {
    sdl: `directive @${name} on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function (parent, args, context) {
                    const { model, filter = {} } = args
                    let response = await find({ model, filter })
                    return response
                };
            }
        }
    }
}

// https://typeorm.io/#select-query-builder/getting-the-generated-query
// const sql = createQueryBuilder("user")
//     .where("user.firstName = :firstName", { firstName: "Timber" })
//     .orWhere("user.lastName = :lastName", { lastName: "Saw" })
//     .getSql();