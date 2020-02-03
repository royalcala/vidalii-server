import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')

module.exports = {
    // type: 'directive',
    alias: 'upper2',
    sdl: `directive @upper2 on FIELD_DEFINITION`,
    fx: class UpperCaseDirective extends SchemaDirectiveVisitor {
        static getDirectiveDeclaration(directiveName, schema) {
            console.log('directiveName::', directiveName)
            // console.log('schema::',schema)
            const previousDirective = schema.getDirective(directiveName)
            console.log('previousDirective::', previousDirective)
        }
        visitFieldDefinition(field) {
            const { resolve = defaultFieldResolver } = field;
            // console.log('**********FIELD::', field)
            // console.log('field.astNode::', field.astNode.directives)
            field.resolve = async function (...args) {


                console.log('print in upper2::')
                // const result = await resolve(args);
                const result = await resolve.apply(this, args);
                console.log('result2::', result)
                console.log('dont has access here')
                // return 'upper2'

                // if (typeof result === "string") {
                //     return result.toUpperCase();
                // }
                // return result;
            }
        }
    }
}