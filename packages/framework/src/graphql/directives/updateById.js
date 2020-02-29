import { defaultFieldResolver } from "graphql";
import updateById from "../../orm/crud/updateById";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const name = 'updateById'
module.exports = {
    sdl: `directive @${name}(model:String) on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { model = null } = this.args;
                if (model === null)
                    return resolveInField(field)
                else
                    return resolveModelPreDefined({ model, field })
            }
        }
    }
}

function resolveInField(field) {
    field.resolve = async function (parent, args) {
        const { model, data } = args
        let response = await updateById({ model, data })
        return response
    };
}

function resolveModelPreDefined({ model, field }) {
    field.resolve = async function (parent, args) {
        const { data } = args
        console.log('%cdata:', 'color: #f2ceb6', data);
        let response = await updateById({ model, data })
        return response
    };
}