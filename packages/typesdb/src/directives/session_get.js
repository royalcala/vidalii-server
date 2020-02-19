import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const jwt = require('jsonwebtoken')

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
                if (username === 'alcala.rao@gmail.com' && password === 'a') {
                    const fromDatabaseUser = {
                        id: 1,
                        username: 'alcala.rao@gmail.com',
                        group:'admin'
                    }
                    const token = jwt.sign(
                        fromDatabaseUser,
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1d', // token will expire in 1days
                        },
                    )

                    return {
                        user: fromDatabaseUser,
                        token
                    }
                }
                else
                    throw new Error('Your username or password is incorrect')
            };
        }
    }
}