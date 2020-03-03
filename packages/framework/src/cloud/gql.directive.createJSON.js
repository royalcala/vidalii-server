import { defaultFieldResolver } from "@graphql";
const { SchemaDirectiveVisitor } = require('@apollo')
const fs = require('fs-extra')
const name = 'createJSON'
module.exports = {
    sdl: `directive @${name}(path: String) on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { path } = this.args;
                const blockToPath = 'uploads/' + path                
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function (parent, args, context) {
                    try {
                        const { data } = args
                        fs.outputJsonSync(blockToPath, data)
                        return {
                            createJSON: true
                        }
                    } catch (error) {
                        return {
                            error
                        }
                    }
                };
            }
        }
    }
}