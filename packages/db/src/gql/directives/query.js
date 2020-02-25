import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')

const name = 'query'
module.exports = {
    sdl: `directive @${name} on FIELD_DEFINITION`,
    resolver: {
        [name]: class query extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { resolve = defaultFieldResolver } = field;
                // console.log('**********FIELD::', field)
                // console.log('field.astNode::', field.astNode.directives)
                field.resolve = async function (...args) {
                    // const result = await resolve(args);
                    console.log('print in upper1')
                    return 'upper1'
                    // if (typeof result === "string") {
                    //     return result.toUpperCase();
                    // }
                    // return result;
                };
            }
        }
    }
}