import insert from "@cloud/orm.crud.insert";
const { SchemaDirectiveVisitor } = require('@apollo')
const name = 'insert'
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
        const { model, dataInsert } = args
        let response = await insert({ model, dataInsert })
        return response

    };
}

function resolveModelPreDefined({ model, field }) {
    field.resolve = async function (parent, args) {
        const { dataInsert } = args
        let response = await insert({ model, dataInsert })
        return response
    };
}
