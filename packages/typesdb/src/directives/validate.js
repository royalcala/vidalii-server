import { defaultFieldResolver, SchemaDirectiveVisitor } from '../lib'
import * as yup from 'yup';

module.exports = {
    // type: 'directive',
    // alias: 'upper',
    sdl: `directive @validate(
        #chain validation v.number().required().positive()
        chain:String!
    ) on FIELD_DEFINITION`,
    fx: class validate extends SchemaDirectiveVisitor {
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