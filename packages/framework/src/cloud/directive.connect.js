import { SchemaDirectiveVisitor } from 'npm.graphql'
import find from "lib.crud.find";
const JSON = require('npm.graphql-type-json').default;

// import { SchemaDirectiveVisitor } from '@vidalii/graphql/lib/graphql'
// import find from "../../orm/crud/find";
// const JSON = require('graphql-type-json').default;
const name = 'connect'
module.exports = {
    sdl: `directive @${name}(key:String model:String modelKey:String) on FIELD_DEFINITION | ARGUMENT_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitArgumentDefinition(argument) {
                console.log('%c⧭In Argument::*******', 'color: #733d00', argument);

            }
            visitFieldDefinition(field) {
                const { key = null, model = null, modelKey = null } = this.args;
                addArgs(field)
                addResolve({ field, key, model, modelKey })

            }
        }
    }
}

function addArgs(field) {
    field.args.push({
        name: 'filter',
        description: 'example filter:{where:{id:1,other:2}}',
        type: JSON
    })

}

function addResolve({ field, key, model, modelKey }) {
    if (model === null)
        resolveInField(field)
    else if (modelKey === null || key === null)
        resolveModelPreDefined({ model, field })
    else
        resolveModelPreDefinedAndNextType({ key, model, modelKey, field })

    function resolveInField(field) {
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
}
