import updateById from "@cloud/orm.crud.updateById";
const { SchemaDirectiveVisitor } = require('@apollo')
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
        const { model, dataUpdate } = args
        let response = await updateById({ model, dataUpdate })
        return response
    };
}

function resolveModelPreDefined({ model, field }) {
    field.resolve = async function (parent, args) {
        const { dataUpdate } = args        
        let response = await updateById({ model, dataUpdate })
        return response
    };
}