import { defaultFieldResolver, SchemaDirectiveVisitor } from '../lib'
const jwt = require('jsonwebtoken')
import models from '../database'

module.exports = {
    // type: 'directive',
    // alias: 'upper',
    sdl: `directive @session_get on FIELD_DEFINITION`,
    fx: class session_get extends SchemaDirectiveVisitor {
        visitFieldDefinition(field) {
            const { resolve = defaultFieldResolver } = field;
            // console.log('**********FIELD::', field)
            // console.log('field.astNode::', field.astNode.directives)
            field.resolve = async function (parent, { username, password }) {
                const user = models.users.find('username', username)
                if (user && user.password === password) {
                    const token = jwt.sign(
                        user,
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1d', // token will expire in 1days
                        },
                    )
                    return {
                        user,
                        token
                    }
                }
                else
                    throw new Error('Your username or password is incorrect')
            };
        }
    }
}