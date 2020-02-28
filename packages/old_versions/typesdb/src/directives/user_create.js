import { defaultFieldResolver, SchemaDirectiveVisitor } from '../lib'
import models from '../database'

module.exports = {
    // type: 'directive',
    // alias: 'upper',
    sdl: `directive @user_create on FIELD_DEFINITION`,
    fx: class user_create extends SchemaDirectiveVisitor {
        visitFieldDefinition(field) {
            const { resolve = defaultFieldResolver } = field;
            field.resolve = async function (parent, args) {
                const user = models.users.insertOne(args.inputUser)
                return user
            }
        }
    }
}