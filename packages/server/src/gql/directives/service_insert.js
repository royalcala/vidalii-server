import { GraphQLID, SchemaDirectiveVisitor } from "@vidalii/graphql/lib/graphql";

const name = 'service_insert'
module.exports = {
    sdl: `directive @${name} on INPUT_OBJECT`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitInputObject(...data) {
                console.log('hellow')
                console.log('%cdataInputObject', 'color: #f2ceb6', data);
                // addArgs(field)
                // addResolve(field)
            }
        }
    }
}

// function addArgs(field) {
//     field.args.push({
//         name: 'id',
//         description: '',
//         type: GraphQLID
//     })

// }

// function addResolve(field) {
//     field.resolve = async (parent, args) => {
//         const { id } = args
//         //service test
//         return 'hellow world!'
//     }
// }

