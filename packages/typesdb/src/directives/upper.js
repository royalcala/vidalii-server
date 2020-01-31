import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')

// export const sdl = `directive @upper on FIELD_DEFINITION`

// export const resolver = class UpperCaseDirective extends SchemaDirectiveVisitor {
//     visitFieldDefinition(field) {
//         const { resolve = defaultFieldResolver } = field;
//         field.resolve = async function (...args) {
//             const result = await resolve.apply(this, args);
//             if (typeof result === "string") {
//                 return result.toUpperCase();
//             }
//             return result;
//         };
//     }
// }

module.exports = {
    sdl: `directive @upper on FIELD_DEFINITION`,
    alias: 'upper',
    type: 'directive',
    fx: class UpperCaseDirective extends SchemaDirectiveVisitor {
        visitFieldDefinition(field) {
            const { resolve = defaultFieldResolver } = field;
            console.log('**********FIELD::',field)
            field.resolve = async function (...args) {
                console.log(args.length)
                console.log('args::', args)
                return 'holis'
                // const result = await resolve.apply(this, args);
                // if (typeof result === "string") {
                //     return result.toUpperCase();
                // }
                // return result;
            };
        }
    }
}