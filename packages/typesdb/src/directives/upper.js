import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')

module.exports = {
    // type: 'directive',
    // alias: 'upper',
    sdl: `directive @upper on FIELD_DEFINITION`,
    fx: class UpperCaseDirective extends SchemaDirectiveVisitor {


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