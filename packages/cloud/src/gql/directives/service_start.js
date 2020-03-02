import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const fs = require('fs-extra')
const name = 'service_start'
module.exports = {
    sdl: `directive @${name} on FIELD_DEFINITION`,
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