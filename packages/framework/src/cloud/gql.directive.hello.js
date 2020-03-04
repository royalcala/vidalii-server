import {
    GraphQLString
} from '@graphql';
import { SchemaDirectiveVisitor } from '@apollo'
import find from "@cloud/orm.crud.find";
// const JSON = require('graphql-type-json').default;
const name = 'hello'
module.exports = {
    sdl: `directive @${name}(state:String) on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitArgumentDefinition(argument) {
                console.log('%c⧭In Argument::*******', 'color: #733d00', argument);
            }
            visitFieldDefinition(field) {
                const { msg = "hello world!", state = null } = this.args;
                addArgs(field)
                addResolver({ field, msg })
            }
        }
    }
}

function addArgs(field) {
    field.args.push({
        name: 'msg',
        description: 'custom msg response from server',
        type: GraphQLString
    })

}
function addResolver(field) {
    field.resolve = async function (parent, args) {

        return 'hellows'
    };
}
