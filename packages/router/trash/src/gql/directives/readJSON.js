import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const fs = require('fs-extra')
const name = 'readJSON'
module.exports = {
    sdl: `directive @${name}(path:String cache: Boolean=false) on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { path } = this.args;
                const blockToPath = 'uploads/' + path
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function () {
                    try {
                        const data = fs.readJsonSync(blockToPath)
                        return data
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