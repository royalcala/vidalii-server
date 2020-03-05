import { SchemaDirectiveVisitor } from "@apollo";
export const buildDirective = ({ name, args = '', defs = [], resolver = {} }) => {
    let extendedClass = SchemaDirectiveVisitor
    Object.entries(resolver).forEach(
        ([nameFx, fx]) => {
            extendedClass.prototype[nameFx] = fx
        }
    )
    return {
        sdl: `directive @${name}${args} on ${defs.join(' | ')}`,
        resolver: {
            [name]: extendedClass
        }
    }
}
//https://www.apollographql.com/docs/apollo-server/schema/creating-directives/#gatsby-focus-wrapper
//resolver{
// visitSchema(schema: GraphQLSchema)
// visitScalar(scalar: GraphQLScalarType)
// visitObject(object: GraphQLObjectType)
// visitFieldDefinition(field: GraphQLField<any, any>)
// visitArgumentDefinition(argument: GraphQLArgument)
// visitInterface(iface: GraphQLInterfaceType)
// visitUnion(union: GraphQLUnionType)
// visitEnum(type: GraphQLEnumType)
// visitEnumValue(value: GraphQLEnumValue)
// visitInputObject(object: GraphQLInputObjectType)
// visitInputFieldDefinition(field: GraphQLInputField)
// }
//https://github.com/graphql/graphql-js/blob/a62eea88d5844a3bd9725c0f3c30950a78727f3e/src/language/directiveLocation.js#L22-L33
// onDefs:[
// export const DirectiveLocation = Object.freeze({
//     // Request Definitions
//     QUERY: 'QUERY',
//     MUTATION: 'MUTATION',
//     SUBSCRIPTION: 'SUBSCRIPTION',
//     FIELD: 'FIELD',
//     FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
//     FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
//     INLINE_FRAGMENT: 'INLINE_FRAGMENT',
//     // Type System Definitions
//     SCHEMA: 'SCHEMA',
//     SCALAR: 'SCALAR',
//     OBJECT: 'OBJECT',
//     FIELD_DEFINITION: 'FIELD_DEFINITION',
//     ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
//     INTERFACE: 'INTERFACE',
//     UNION: 'UNION',
//     ENUM: 'ENUM',
//     ENUM_VALUE: 'ENUM_VALUE',
//     INPUT_OBJECT: 'INPUT_OBJECT',
//     INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION',
//   });
// ]