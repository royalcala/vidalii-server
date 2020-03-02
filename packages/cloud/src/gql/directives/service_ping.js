import { GraphQLID, SchemaDirectiveVisitor } from "@vidalii/graphql/lib/graphql";

const name = 'service_ping'
module.exports = {
    sdl: `directive @${name} on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                addArgs(field)
                addResolve(field)
            }
        }
    }
}

function addArgs(field) {
    field.args.push({
        name: 'id',
        description: '',
        type: GraphQLID
    })

}

function addResolve(field) {
    field.resolve = (parent, args) => {
        const { id } = args
        //service test
        return 'hellow world!'
    }
}

