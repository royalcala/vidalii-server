import { defaultFieldResolver, SchemaDirectiveVisitor } from '../lib'
import models from '../database'
module.exports = {
    // type: 'directive',
    // alias: 'upper',
    sdl: `directive @query(
        # type of data model
        type:String
        #condition sql->json
        filter:JSON
        ) on FIELD_DEFINITION`,
    fx: class query extends SchemaDirectiveVisitor {
        visitFieldDefinition(field) {
            const { resolve = defaultFieldResolver } = field;
            field.resolve = async function (...args) {
                return models.users.getAll()
            };
        }
    }
}