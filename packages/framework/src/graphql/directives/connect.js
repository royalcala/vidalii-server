import { defaultFieldResolver } from "graphql";
import find from "../../orm/crud/find";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const name = 'connect'
module.exports = {
    sdl: `directive @${name}(key:String model:String modelKey:String) on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { key = null, model = null, modelKey = null } = this.args;
                if (model === null)
                    return resolveInField(field)
                else if (modelKey === null || key === null)
                    return resolveModelPreDefined({ model, field })
                else
                    return resolveModelPreDefinedAndNextType({ key, model, modelKey, field })
            }
        }
    }
}
function resolveInField(field) {
    // const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (parent, args) {
        const { model, filter = {} } = args
        let response = await find({ model, filter })
        return response
    };
}

function resolveModelPreDefined({ model, field }) {
    field.resolve = async function (parent, args) {
        const { filter = {} } = args
        let response = await find({ model, filter })
        return response
    };
}

function resolveModelPreDefinedAndNextType({ key, model, modelKey, field }) {
    field.resolve = async function (parent, args) {
        const { filter = {} } = args
        const value = parent[key]
        const refilter = {
            ...filter,
            where: {
                ...filter.where,
                [modelKey]: value
            }
        }
        let response = await find({ model, filter: refilter })
        return response
    };
}